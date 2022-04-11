const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const roomId = crypto.randomBytes(16).toString("hex");
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({
      status: true,
      user: { username: username, roomId: roomId },
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorect username or password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorect username or password", status: false });
    }
    const roomId = crypto.randomBytes(16).toString("hex");
    delete user.password;
    return res.json({
      status: true,
      user: { username: username, roomId: roomId },
    });
  } catch (ex) {
    next(ex);
  }
};
