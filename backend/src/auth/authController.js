const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { PASSWORD_SECRET } = require("../config/constants");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (await bcrypt.compare(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        PASSWORD_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ user: user.email, token: token });
    } else {
      res.status(400).json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const data = req.body;

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: { email: "Email already exists" },
      });
    }

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
    console.log(error); // Log the entire error object for debugging
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ success: false, errors });
    }

    // Handle MongoError 11000 for duplicate key errors
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        errors: { email: "Email already exists" },
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// You can add more authentication-related functions here, such as:
// exports.forgotPassword = async (req, res) => { ... }
// exports.resetPassword = async (req, res) => { ... }
