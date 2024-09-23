const { Order } = require("../models/order");

exports.getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});
    res.json(orderList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add more order-related controller functions here as needed