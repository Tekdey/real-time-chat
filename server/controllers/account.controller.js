const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.updateAccount = async (req, res, next) => {
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
module.exports.deleteAccount = async (req, res, next) => {
  try {
    const { password, local_data } = req.body;

    const user = await User.findOne(local_data);

    if (local_data === null) {
      return res.json({ status: false, msg: "Error, please try later" });
    }
    if (!user) {
      return res.json({ status: false, msg: "Error, please try later" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ msg: "Incorect password", status: false });
    }
    if (isPasswordValid) {
      await User.deleteOne(user);
    }

    res.json({
      status: true,
      msg: "Account has been delete",
    });
  } catch (er) {
    next(er);
  }
};
module.exports.updatePassword = async (req, res, next) => {
  try {
    const { password, newPassword, local_data } = req.body;

    const user = await User.findOne({ local_data });
    if (!user) {
      return res.json({ status: false, msg: "Error, please try later" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ status: false, msg: "Your password is incorrect" });
    }
    delete user.password;
    if (isPasswordValid) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findOneAndUpdate(local_data, {
        password: hashedPassword,
      });
    }
    return res.json({
      status: true,
      msg: "Your password has been updated",
    });
  } catch (er) {
    next(er);
  }
};
