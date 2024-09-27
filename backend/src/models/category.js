const mongoose = require("mongoose");

// Model is same as Collection in mongodb
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "Category name cannot exceed 50 characters"],
  },
  color: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        return /^[#a-fA-F0-9]{6}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid hex color code!`,
    },
  },
  icon: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

exports.Category = mongoose.model("Category", categorySchema);
