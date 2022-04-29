const controllers = require("../controllers/index");

const router = require("express").Router();

router.post("/signup", controllers.auth.signup);
router.post("/login", controllers.auth.login);

module.exports = router;
