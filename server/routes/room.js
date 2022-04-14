const {
  createRoom,
  joinRoom,
  allRoom,
  getRoomName,
} = require("../controllers/room");
const router = require("express").Router();

router.post("/room/create", createRoom);
router.post("/room/join", joinRoom);

router.post("/room/name", getRoomName);
router.get("/room/all", allRoom);

module.exports = router;
