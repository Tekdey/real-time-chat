const { register } = require("../controllers/auth");
const { login } = require("../controllers/auth");

const router = require("express").Router();
/*////////////////// AUTHENTIFICATIONS ///////////////////*/
router.post("/register", register);
router.post("/login", login);
/*////////////////// SOCKETIO ///////////////////*/
router.get("/", (req, res) => {
  res.send("Chat");
});

module.exports = router;
