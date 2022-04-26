const auth = require("./auth.js");
const room = require("./room.js");
const account = require("./account.js");

const routes = {
  auth,
  room,
  account,
};

module.exports = routes;
