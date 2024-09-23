const express = require("express");
const router = express.Router();

const { Product } = require("../models/product");
const { Category } = require("../models/category");

const mongoose = require("mongoose");

/**
 * @route GET /api/products
 * @description Get a list of all products with only name and image
 * @access Public
 */
router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter);
  // const productList = await Product.find(filter).select("name image");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

/**
 * @route GET /api/products/:id
 * @description Get a single product by ID
 * @access Public
 */
router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false, message: "Product not found" });
  }
  res.send(product);
});

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private
 */
router.post(`/`, async (req, res) => {
  try {
    // Check if the category exists
    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(400).send("Invalid category!");
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }

  const data = req.body;
  let product = new Product({
    name: data.name,
    image: data.image,
    description: data.description,
    richDescription: data.richDescription,
    image: data.image,
    images: data.images,
    brand: data.brand,
    price: data.price,
    category: data.category,
    countInStock: data.countInStock,
    rating: data.rating,
    numReviews: data.numReviews,
    isFeatured: data.isFeatured,
  });

  product = await product.save();

  if (!product) {
    return res.status(400).send("the product cannot be created!");
  }
  res.send(product);

  /**
   * A more complex way to save a product
   *
   * product
   *  .save()
   *  .then((createdProduct) => {
   *    res.status(201).json(createdProduct);
   *  })
   *  .catch((err) => {
   *    res.status(500).json({
   *      error: err,
   *      success: false,
   *    });
   *  });
   */
});

/**
 * @route PUT /api/products/:id
 * @description Update a product by ID
 * @access Private
 */
router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid Product ID" });
  }
  const data = req.body;
  try {
    const category = await Category.findById(data.category);

    if (!category) {
      return res.status(400).send("Invalid category!");
    }

    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: data.name,
      image: data.image,
      description: data.description,
      richDescription: data.richDescription,
      image: data.image,
      images: data.images,
      brand: data.brand,
      price: data.price,
      category: data.category,
      countInStock: data.countInStock,
      rating: data.rating,
      numReviews: data.numReviews,
      isFeatured: data.isFeatured,
    });

    if (!product) {
      return res.status(400).send("the product cannot be updated!");
    }
    res.send(product);
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

/**
 * @route DELETE /api/products/:id
 * @description Delete a product by ID
 * @access Private
 */
router.delete(`/:id`, (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err.message });
    });
});

/**
 * @route GET /api/products/get/count
 * @description Get the count of all products
 * @access Public
 */
router.get(`/get/count`, async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.send({
      productCount: productCount,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @route GET /api/products/get/featured/:count
 * @description Get the count of all products
 * @access Public
 */
router.get(`/get/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true })
    .sort({ dateCreated: -1 })
    .limit(+count);
  res.send(products);
});

module.exports = router;
