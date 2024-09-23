const mongoose = require("mongoose");

// Model is same as Collection in mongodb
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    richDescription: {
      type: String,
      default: "",
      trim: true,
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
    images: [
      {
        type: String,
        validate: {
          validator: function (v) {
            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
              v
            );
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      max: [1000000, "Price cannot exceed 1,000,000"],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      min: [0, "Stock count cannot be negative"],
      max: [10000, "Stock count cannot exceed 10,000"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    numReviews: {
      type: Number,
      default: 0,
      min: [0, "Number of reviews cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

// For efficient search, we can create a text index on the name and description fields.

productSchema.index({ name: "text", description: "text" });

//The virtual method allows you to define properties that are not stored in the database but can be computed from existing data. In this case, id is a virtual property.

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// The toJSON method is used to convert the product object and its virtual properties to a JSON object.

productSchema.set("toJSON", {
  virtuals: true,
});

exports.Product = mongoose.model("Product", productSchema);
