const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("rooms", roomSchema);
