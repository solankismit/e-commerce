const mongoose = require("mongoose");

// Model is same as Collection in mongodb
const userSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

exports.User = mongoose.model("User", userSchema);
