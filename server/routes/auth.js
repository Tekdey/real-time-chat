const { register, login } = require("../controllers/auth");

const router = require("express").Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

module.exports = router;
