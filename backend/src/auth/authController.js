const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { PASSWORD_SECRET } = require("../config/constants");

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
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

// You can add more authentication-related functions here, such as:
// exports.register = async (req, res) => { ... }
// exports.forgotPassword = async (req, res) => { ... }
// exports.resetPassword = async (req, res) => { ... }