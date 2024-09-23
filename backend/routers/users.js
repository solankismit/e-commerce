const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { PASSWORD_SECRET } = require("../contants");

/**
 * @route GET /api/users
 * @description Get a list of all users (excluding password hashes)
 * @access Public
 */
router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    return res.status(500).json({ success: false });
  }
  res.send(userList);
});

/**
 * @route GET /api/users/:id
 * @description Get a single user by ID (excluding password hash)
 * @access Public
 */
router.get(`/:id`, async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    return res.status(500).json({ success: false, message: "User not found" });
  }
  res.send(user);
});

/**
 * @route GET /api/users/get/count
 * @description Get the count of all users
 * @access Public
 */
router.get(`/get/count`, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.send({
      userCount: userCount,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
});

/**
 * @route POST /api/users
 * @description Create a new user
 * @access Private
 */
router.post(`/`, async (req, res) => {
  console.log(PASSWORD_SECRET);
  const salt = bcrypt.genSaltSync(10);

  const data = req.body;
  let user = new User({
    name: data.name,
    email: data.email,
    passwordHash: bcrypt.hashSync(data.password, salt),
    phone: data.phone,
    street: data.street,
    apartment: data.apartment,
    city: data.city,
    zip: data.zip,
    country: data.country,
    isAdmin: data.isAdmin,
  });

  user = await user.save();

  if (!user) {
    return res.status(400).send("The user cannot be created!");
  }
  res.send(user);
});

/**
 * @route DELETE /api/users/:id
 * @description Delete a user by ID
 * @access Private
 */
router.delete("/:id", async (req, res) => {
  // delete a user by id
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "The user is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

/**
 * @route POST /api/users/login
 * @description Authenticate a user and return a JWT token
 * @access Public
 */
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("The user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      PASSWORD_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("Incorrect Password");
  }
});

module.exports = router;
