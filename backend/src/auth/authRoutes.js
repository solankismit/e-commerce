const express = require("express");
const router = express.Router();
const authController = require("./authController");

router.post("/login", authController.login);
// Add more authentication routes as needed:
// router.post("/register", authController.register);
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password", authController.resetPassword);

module.exports = router;