const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Users = require("../models/User");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await Users.findOne({ username });
    if (usernameCheck) {
      return res.json({
        msg: "Username already used",
        status: 400,
      });
    }
    const emailCheck = await Users.findOne({ email });
    if (emailCheck) {
      return res.json({
        msg: "Email already used",
        status: 400,
      });
    }
    // const userId = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = Users.findOne({ username });
    if (!user) {
      res.status(400).json({ msg: "Wrong username or password" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(400).json({ msg: "Wrong username or password" });
    }
    delete user.password;
    res.status(200).json({ username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { signup, login };
