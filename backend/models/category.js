const mongoose = require("mongoose");

// Model is same as Collection in mongodb
const categorySchema = mongoose.Schema({});

exports.Category = mongoose.model("Category", categorySchema);
