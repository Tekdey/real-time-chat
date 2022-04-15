const { updateAccount, deleteAccount } = require("../controllers/account");

const router = require("express").Router();

router.post("/account/update", updateAccount);
router.post("/account/delete", deleteAccount);

module.exports = router;
