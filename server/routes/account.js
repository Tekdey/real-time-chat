const controllers = require("../controllers/index");

const router = require("express").Router();

router.post("/update", controllers.account.updateAccount);
router.post("/update/password", controllers.account.updatePassword);
router.post("/delete", controllers.account.deleteAccount);

module.exports = router;
