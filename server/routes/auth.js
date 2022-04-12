const { register, login } = require("../controllers/auth");
const { createRoom, joinRoom } = require("../controllers/room");

const router = require("express").Router();
/*////////////////// AUTHENTIFICATIONS ///////////////////*/
router.post("/auth/register", register);
router.post("/auth/login", login);
/*////////////////// ROOMS ///////////////////*/
router.post("/room/create", createRoom);
router.post("/room/join", joinRoom);
/*////////////////// SOCKETIO ///////////////////*/
router.get("/", (req, res) => {
  res.send("Chat");
});

module.exports = router;
