const express = require("express");
const router = express.Router();

const { Category } = require("../models/category");

/**
 * @route GET /api/categories
 * @description Get all categories
 * @access Public
 */
router.get(`/`, async (req, res) => {
  // find() is used to get all the categories from the database
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

/**
 * @route GET /api/categories/:id
 * @description Get a single category by ID
 * @access Public
 */
router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(500).json({
      success: false,
      message: "The category with the given ID was not found.",
    });
  }
  res.status(200).send(category);
});

/**
 * @route POST /api/categories
 * @description Create a new category
 * @access private
 */
router.post("/", async (req, res) => {
  // create a new category
  let category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
    image: req.body.image,
  });
  category = await category.save();
  if (!category) return res.status(404).send("the category cannot be created!");
  res.send(category);
});

/**
 * @route PUT /api/categories/:id
 * @description Update a category by ID
 * @access Private
 */
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
      image: req.body.image,
    },
    // new: true is used to return the updated category
    { new: true }
  );
  if (!category) return res.status(404).send("the category cannot be updated!");
  res.send(category);
});

/**
 * @route DELETE /api/categories/:id
 * @description Delete a category by ID
 * @access Private
 */
router.delete("/:id", async (req, res) => {
  // delete a category by id
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
      return res
        .status(200)
        .json({ success: true, message: "The category is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Category not found!" });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
