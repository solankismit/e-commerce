const mongoose = require("mongoose");

// Model is same as Collection in mongodb
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength: [15, "Phone number cannot exceed 15 characters"],
  },
  street: {
    type: String,
    default: "",
    trim: true,
    maxlength: [100, "Street address cannot exceed 100 characters"],
  },
  apartment: {
    type: String,
    default: "",
    trim: true,
    maxlength: [50, "Apartment number cannot exceed 50 characters"],
  },
  city: {
    type: String,
    default: "",
    trim: true,
    maxlength: [50, "City cannot exceed 50 characters"],
  },
  zip: {
    type: String,
    default: "",
    trim: true,
    maxlength: [10, "Zip code cannot exceed 10 characters"],
  },
  country: {
    type: String,
    default: "",
    trim: true,
    maxlength: [50, "Country cannot exceed 50 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
