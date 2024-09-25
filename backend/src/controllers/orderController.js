const { populate } = require("dotenv");
const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");

exports.getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });
    res.json(orderList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;
  try {
    const order = new Order({
      orderItems: orderItemsIdsResolved,
      user: req.body.user,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      dateOrdered: req.body.dateOrdered,
    });
    const savedOrder = await order.save();
    if (!savedOrder) return res.status(400).send("The order cannot be created");
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Add more order-related controller functions here as needed
