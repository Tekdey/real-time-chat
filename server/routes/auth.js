const controllers = require("../controllers/index");

const router = require("express").Router();

router.post("/register", controllers.auth.register);
router.post("/login", controllers.auth.login);

module.exports = router;
