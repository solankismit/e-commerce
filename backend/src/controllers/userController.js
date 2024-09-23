const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { PASSWORD_SECRET } = require("../config/constants");

exports.getAllUsers = async (req, res) => {
  try {
    const userList = await User.find().select("-passwordHash");
    res.json(userList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({ userCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const data = req.body;
    const user = new User({
      name: data.name,
      email: data.email,
      passwordHash: await bcrypt.hash(data.password, salt),
      phone: data.phone,
      street: data.street,
      apartment: data.apartment,
      city: data.city,
      zip: data.zip,
      country: data.country,
      isAdmin: data.isAdmin,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.json({ success: true, message: "The user is deleted!" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, message: "The user not found" });
    }

    if (await bcrypt.compare(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin
        },
        PASSWORD_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ user: user.email, token: token });
    } else {
      res.status(400).json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};