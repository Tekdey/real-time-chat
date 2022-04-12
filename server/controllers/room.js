const Room = require("../models/Room");
const crypto = require("crypto");

module.exports.createRoom = async (req, res, next) => {
  try {
    const { roomName } = req.body;
    const roomId = crypto.randomBytes(16).toString("hex");
    const room = await Room.create({
      name: roomName,
      roomId,
    });
    return res.json({
      status: true,
      room,
    });
  } catch (er) {
    next(er);
  }
};

module.exports.joinRoom = async (req, res, next) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findOne({
      roomId,
    });
    if (!room) {
      return res.json({ msg: "Wrong room id", status: false });
    }
    return res.json({
      status: true,
      room,
    });
  } catch (er) {
    next(er);
  }
};