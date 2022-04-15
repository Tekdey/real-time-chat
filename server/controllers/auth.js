const User = require("../models/User");
const bcrypt = require("bcrypt");

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
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({
      status: true,
      user: { username: username },
    });
  } catch (er) {
    next(er);
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
      return res.json({ msg: "Incorect password", status: false });
    }
    delete user.password;
    return res.json({
      status: true,
      user: {
        username: username,
        email: user.email,
      },
    });
  } catch (er) {
    next(er);
  }
};
module.exports.update = async (req, res, next) => {
  try {
    const { username, email, local_data } = req.body;

    // Check username

    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      if (checkUsername.username !== local_data.username) {
        return res.json({
          msg: "Username already taken",
          status: false,
          updateLocal: local_data,
        });
      }
    }
    if (!checkUsername) {
      await User.findOneAndUpdate(local_data, { username });
      local_data.username = username;
    }
    // Check email

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      if (checkEmail.email !== local_data.email) {
        return res.json({
          msg: "Email already taken",
          status: false,
          updateLocal: local_data,
        });
      }
    }
    if (!checkEmail) {
      await User.findOneAndUpdate(local_data, { email });
      local_data.email = email;
    }

    return res.json({
      status: true,
      username: username,
      email: email,
    });
  } catch (er) {
    next(er);
  }
};
