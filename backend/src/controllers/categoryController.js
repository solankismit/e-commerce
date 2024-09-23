const { Category } = require("../models/category");

exports.getAllCategories = async (req, res) => {
  try {
    const categoryList = await Category.find();
    res.json(categoryList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "The category with the given ID was not found.",
      });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
      image: req.body.image,
    });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
        image: req.body.image,
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found!" });
    }
    res.json({ success: true, message: "The category is deleted!" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};