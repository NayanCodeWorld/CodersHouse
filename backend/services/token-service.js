const jwt = require("jsonwebtoken");
const refreshtokenModel = require("../models/refreshtoken-model");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshtokenModel.create({
        token,
        userId,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }
}

module.exports = new TokenService();
