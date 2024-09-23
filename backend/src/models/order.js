const mongoose = require("mongoose");

// Model is same as Collection in mongodb
const orderSchema = mongoose.Schema({});

exports.Order = mongoose.model("Order", orderSchema);
