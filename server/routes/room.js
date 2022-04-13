const { createRoom, joinRoom, allRoom } = require("../controllers/room");
const router = require("express").Router();

router.post("/room/create", createRoom);
router.post("/room/join", joinRoom);

router.get("/room/all", allRoom);

module.exports = router;
