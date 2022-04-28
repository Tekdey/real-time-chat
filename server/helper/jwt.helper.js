const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_TOKEN_ACCESS_PRIVATE_KEY, {
    expiresIn: "1m",
  });
};
const verifyAccessToken = (token, req, next) => {
  jwt.verify(token, process.env.JWT_TOKEN_ACCESS_PRIVATE_KEY, (error, user) => {
    if (error) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_ACCESS_PRIVATE_KEY, {
    expiresIn: "5m",
  });
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
};
