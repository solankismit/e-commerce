const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get(`/`, orderController.getAllOrders);

// Add more order-related routes here as needed

module.exports = router;