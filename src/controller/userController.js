const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(401);
    throw new Error("all fields are mandatory.");
  }

  const userAvailabel = await User.findOne({ email });
  if (userAvailabel) {
    res.status(400);
    throw new Error("Email already exist");
  }

  // hashpassword
  const hasedPassword = await bcrypt.hash(password, 10);
  // console.log("hash", hasedPassword);
  const user = await User.create({ username, email, password: hasedPassword });
  res.status(200).json(user);
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Plaese enter correct email and password");
  }
  // console.log("email", email);
  const user = await User.findOne({ email });
  // console.log("user", user);
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Wrong email or password");
  }
});

// delete user

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("id-delete", id);
  const user = await User.findById(id);
  console.log("id-delete", user);

  if (!user) {
    res.status(400);
    throw new Error("no user exit with this id");
  }
  await User.deleteOne({ _id: id });
  res.status(200).json(user);
});
// private route
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  getAllUser,
  registerUser,
  loginUser,
  currentUser,
  deleteUser,
};
