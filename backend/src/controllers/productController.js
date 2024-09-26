const { Product } = require("../models/product");
const { Category } = require("../models/category");
const mongoose = require("mongoose");

exports.getAllProducts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }
    const productList = await Product.find(filter).populate("category");
    res.json(productList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request");

    const category = await Category.findById(req.body.category);
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category!" });
    }

    const fileName = req.file?.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basePath}${fileName}`,
      images: req.body.images,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Product ID" });
    }

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category!" });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateProductImage = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Product ID" });
    }

    const files = req.files;
    let imagePaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    if (files) {
      files?.map((file) => {
        imagePaths.push(`${basePath}${file.filename}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { images: imagePaths },
      {
        new: true,
      }
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found!" });
    }
    res.json({ success: true, message: "The product is deleted!" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.json({ productCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  try {
    const count = req.params.count ? parseInt(req.params.count) : 0;
    const products = await Product.find({ isFeatured: true })
      .sort({ dateCreated: -1 })
      .limit(count);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
