const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helper/jwt.helper");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res
        .status(401)
        .json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(401).json({ msg: "Email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    console.log(user);

    const token = generateAccessToken({ username });

    return res.status(200).json({
      status: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({ msg: "error please try later", error });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Incorect username or password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ msg: "Incorect username or password", status: false });
    }
    delete user.password;

    const token = generateAccessToken({ username });
    const refreshToken = generateRefreshToken({ username });

    console.log(token);
    return res.status(200).json({
      status: true,
      token,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error please try later", error });
  }
};
