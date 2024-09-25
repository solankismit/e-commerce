const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get(`/`, orderController.getAllOrders);
router.get(`/:id`, orderController.getSingleOrder);
router.post(`/`, orderController.createOrder);
router.put(`/:id`, orderController.updateOrder);
router.delete(`/:id`, orderController.deleteOrder);
router.get(`/get/totalsales`, orderController.getTotalSales);
router.get(`/get/ordercount`, orderController.getOrderCount);
router.get(`/get/userorders/:userid`, orderController.getUserOrder);

// Add more order-related routes here as needed

module.exports = router;
