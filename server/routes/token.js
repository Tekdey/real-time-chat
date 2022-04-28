const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { accessToken } = require("../middlewares/jwt.middleware");
const { generateAccessToken } = require("../helper/jwt.helper");

// Access token

router.get("/access", accessToken, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

// Refresh token

router.post("/refresh", (req, res) => {
  console.log("refresh");

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(
    token,
    process.env.JWT_REFRESH_TOKEN_ACCESS_PRIVATE_KEY,
    (error, user) => {
      if (error) {
        return res.sendStatus(401);
      }
      delete user.iat;
      delete user.exp;
      const refreshToken = generateAccessToken(user);
      return res.send({ refreshToken: refreshToken });
    }
  );
});

module.exports = router;
