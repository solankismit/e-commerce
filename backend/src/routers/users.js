const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get(`/`, userController.getAllUsers);
router.get(`/:id`, userController.getUserById);
router.get(`/get/count`, userController.getUserCount);
router.delete("/:id", userController.deleteUser);

module.exports = router;