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
  try {
    const orderItemsIds = Promise.all(
      req.body?.orderItems?.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(
      orderItemsIdsResolved?.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          "product",
          "price"
        );

        const totalPrice = orderItem.product.price * orderItem.quantity;

        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
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
      totalPrice: totalPrice,
      dateOrdered: req.body.dateOrdered,
    });
    const savedOrder = await order.save();
    if (!savedOrder) return res.status(400).send("The order cannot be created");
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }

    // Delete associated order items in parallel
    await Promise.all(
      order?.orderItems?.map(async (orderItem) => {
        await OrderItem.findByIdAndDelete(orderItem?._id);
      })
    );

    return res.json({
      success: true,
      message: `The order is deleted!`,
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

exports.getTotalSales = async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }

  res.send({ totalSales: totalSales.pop().totalsales });
};

exports.getOrderCount = async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();
    res.json({ orderCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const userOrdersList = await Order.find({ user: req.params.userid })
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      })
      .sort({ dateOrdered: -1 });
    res.json(userOrdersList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
