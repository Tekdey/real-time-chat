const { register, login, update } = require("../controllers/auth");

const router = require("express").Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/update", update);

module.exports = router;
