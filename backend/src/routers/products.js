const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { uploadOptions } = require("../config/multerConfig");

router.get(`/`, productController.getAllProducts);
router.get(`/:id`, productController.getProductById);
router.post(
  `/`,
  uploadOptions.single("image"),
  productController.createProduct
);
router.put(`/:id`, productController.updateProduct);
router.put(
  `/gallery-images/:id`,
  uploadOptions.array("images"),
  productController.updateProductImage
);
router.delete(`/:id`, productController.deleteProduct);
router.get(`/get/count`, productController.getProductCount);
router.get(`/get/featured/:count`, productController.getFeaturedProducts);

module.exports = router;
