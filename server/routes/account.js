const {
  updateAccount,
  deleteAccount,
  updatePassword,
} = require("../controllers/account");

const router = require("express").Router();

router.post("/account/update", updateAccount);
router.post("/account/update/password", updatePassword);
router.post("/account/delete", deleteAccount);

module.exports = router;
