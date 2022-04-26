const router = require("express").Router();
const controllers = require("../controllers/index");

router.post("/create", controllers.room.createRoom);
router.post("/join", controllers.room.joinRoom);
router.post("/name", controllers.room.getRoomName);
router.get("/all", controllers.room.allRoom);

module.exports = router;
