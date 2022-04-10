const { register } = require("../controllers/auth");
const { login } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
