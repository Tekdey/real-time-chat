const account = require("./account.controller");
const auth = require("./auth.controller");
const room = require("./room.controller");

const controllers = {
  account,
  auth,
  room,
};

module.exports = controllers;
