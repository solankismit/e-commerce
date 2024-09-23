const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { PASSWORD_SECRET } = require("../contants");

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

/**
 * @route GET /api/users/:id
 * @description Get a single user by ID
 * @access Public
 */
router.get(`/:id`, async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res.status(500).json({ success: false, message: "user not found" });
  }
  res.send(user);
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
    return res.status(400).send("the user cannot be created!");
  }
  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("The user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
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
