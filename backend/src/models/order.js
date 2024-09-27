const mongoose = require("mongoose");
// Model is same as Collection in mongodb
const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: [true, "Order items are required"],
    },
  ],
  shippingAddress1: {
    type: String,
    required: [true, "Shipping address line 1 is required"],
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  zip: {
    type: String,
    required: [true, "Zip code is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  status: {
    type: String,
    required: [true, "Order status is required"],
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// The toJSON method is used to convert the order object and its virtual properties to a JSON object.

orderSchema.set("toJSON", {
  virtuals: true,
});
exports.Order = mongoose.model("Order", orderSchema);
