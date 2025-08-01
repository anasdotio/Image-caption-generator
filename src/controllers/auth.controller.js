const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ username });

  if (isUserAlreadyExists)
    return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({ username, password: hashedPassword });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({ message: "User created successfully", user });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) return res.status(400).json({ message: "invalid credientials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res.status(400).json({ message: "invalid credientials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged In",
    user,
  });
}

module.exports = {
  registerController,
  loginController,
};
