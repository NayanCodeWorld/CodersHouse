const otpService = require("../services/otp-sevice");
const hashOtpService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

const UserDto = require("../dtos/user-dto");

class AuthController {
  // Logic for random otp
  async sendOtp(req, res) {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // generate otp
    const otp = await otpService.generateOtp();

    // Hash otp
    const ttl = 1000 * 60 * 2; // 2 min
    const expires = Date.now() + ttl;
    const data = `${phoneNumber}.${otp}.${expires}`;
    const hashOtp = hashOtpService.hashOtp(data);

    //send otp in mobile number
    try {
      // await otpService.sendBySms(phoneNumber, otp); // for testing purposes

      return res.json({
        hash: `${hashOtp}.${expires}`,
        phoneNumber,
        otp, // for testing purposes
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "message sending failed" });
    }
  }

  // Verify otp
  async verifyOtp(req, res) {
    const { otp, hash, phoneNumber } = req.body;

    if (!otp || !hash || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > Number(expires)) {
      return res.status(400).json({ message: "Otp expired" });
    }

    const data = `${phoneNumber}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Otp" });
    }

    let user;

    try {
      user = await userService.findUser({ phoneNumber });
      if (!user) {
        user = await userService.createUser({ phoneNumber });
      }
    } catch (e) {
      //console.log(e);
      return res.status(500).json({ message: "DB Error" });
    }

    // create JWT token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      id: user._id,
      activated: false,
    });

    //store refresh token in DB
    await tokenService.storeRefreshToken(refreshToken, user.id);

    // store refresh token in cookies
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
      httpOnly: true,
    });

    // store acess token in cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 2, //2 min
      httpOnly: true,
    });

    const userDto = new UserDto(user);

    return res.json({ user: userDto, auth: true });
  }

  // Refresh access token with refresh token
  async refresh(req, res) {
    // (1) get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    //console.log("refreshTokenFromCookie", refreshTokenFromCookie);
    // (2) check if refresh is valid or not
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    //console.log("userData >>> >>> >>>", userData);
    // (3) check refresh token is in DB
    let token;
    try {
      token = await tokenService.findRefreshToken(
        userData.id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
      //console.log("token >>> >>", token);
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }

    // (4) Check valid user
    const user = await userService.findUser({ _id: token.userId });
    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    //console.log("user >>> >>", user);
    // (5) generate new refresh and access token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      id: user._id,
    });
    //console.log("access token", accessToken);
    // (6) Update Refresh Token
    try {
      await tokenService.updateRefreshToken(user._id, refreshToken);
      //"refresh token");
    } catch (error) {
      return res.status(500).json({ message: "Internal error" });
    }

    // (7) again store in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
      httpOnly: true,
    });
    // store refresh token in cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 1, //1 min
      httpOnly: true,
    });
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }

  // Logout
  async logout(req, res) {
    const { refreshToken } = req.cookies;
    // delete refresh from db
    await tokenService.removeToken(refreshToken);
    // delete cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    return res.json({ user: null, auth: false });
  }
}

module.exports = new AuthController();
