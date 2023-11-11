const otpService = require("../services/otp-sevice");
const hashOtpService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

class AuthController {
  // Logic for ranome otp
  async sendOtp(req, res) {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      res.status(400).json({ message: "Phone number is required" });
    }

    // generate otp
    const otp = await otpService.generateOtp();

    // Hash otp
    const ttl = 1000 * 60 * 2; // 2 min
    const expires = Date.now() + ttl;
    const data = `${phoneNumber}.${otp}.${expires}`;
    const hashOtp = hashOtpService.hashOtp(data);

    //send otp
    try {
      await otpService.sendBySms(phoneNumber, otp);
      return res.json({
        hash: `${hashOtp}.${expires}`,
        phoneNumber,
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
      res.status(400).json({ message: "All fields are required" });
    }

    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > Number(expires)) {
      res.status(400).json({ message: "Otp expired" });
    }

    const data = `${phoneNumber}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      res.status(400).json({ message: "Invalid Otp" });
    }

    let user;

    try {
      user = await userService.findUser({ phoneNumber });
      if (!user) {
        user = await userService.createUser({ phoneNumber });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "DB Error" });
    }

    // create JWT token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      id: user._id,
      activated: false,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.json({ accessToken });
  }
}

module.exports = new AuthController();
