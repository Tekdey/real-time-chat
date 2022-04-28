const router = require("express").Router();
const { accessToken } = require("../middlewares/jwt.middleware");

router.get("/access", accessToken, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

module.exports = router;
