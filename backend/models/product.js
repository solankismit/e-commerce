const mongoose = require("mongoose");

// Model is same as Collection in mongodb
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

exports.Product = mongoose.model("Product", productSchema);
