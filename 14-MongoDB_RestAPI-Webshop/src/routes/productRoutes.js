const express = require("express");

const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProductToCart,
  deleteProductFromCart,
} = require("../controllers/productController");

// Routes
// GET /api/v1/products/ - Get all products
router.get("/", getAllProducts);

// GET /api/v1/products/:productId - Get product by id
router.get("/:productId", getProductById);

// POST /api/v1/products/:productId - Add product to cart (by id)
router.post("/:productId", addProductToCart);

// DELETE /api/v1/products/:productId - Delete product from cart (by id)
router.delete("/:productId", deleteProductFromCart);

module.exports = router;
