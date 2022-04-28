const { verifyAccessToken } = require("../helper/jwt.helper");

module.exports.accessToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.sendStatus(401);
    }
    verifyAccessToken(token, req, next);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Incorrect access token, please, sign in you account." });
  }
};
