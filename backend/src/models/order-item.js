const mongoose = require("mongoose");

// Model is same as Collection in mongodb
const orderItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be less than 1"],
  },
});

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);
