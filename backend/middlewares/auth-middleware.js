const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.verifyAccessToken(accessToken);

    // userDate = {
    //   id: '6589b47d277fa9b93421f458',
    //   activated: false,
    //   iat: 1703523453,
    //   exp: 1703523573
    // }

    if (!userData) {
      throw new Error();
    }

    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};
