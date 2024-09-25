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
  },
});

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);
