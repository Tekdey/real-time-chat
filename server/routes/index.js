const auth = require("./auth.js");
const room = require("./room.js");
const account = require("./account.js");
const token = require("./token.js");

const routes = {
  auth,
  room,
  account,
  token,
};

module.exports = routes;
