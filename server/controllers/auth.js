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
    console.log(user.password);
    if (!user) {
      return res.json({ msg: "Error please try later", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorect password", status: false });
    }

    if (isPasswordValid) {
      await User.deleteOne(user);
    }

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
