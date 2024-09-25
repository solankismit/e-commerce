const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get(`/`, orderController.getAllOrders);
router.get(`/:id`, orderController.getSingleOrder);
router.post(`/`, orderController.createOrder);

// Add more order-related routes here as needed

module.exports = router;
