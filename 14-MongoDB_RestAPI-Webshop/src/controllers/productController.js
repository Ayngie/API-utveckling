const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { NotFoundError, BadRequestError } = require("../utils/errors");

//CRUD Product:

// GET /api/v1/products/ - Get all products
exports.getAllProducts = async (req, res, next) => {
  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query.offset || 0);
  const products = await Product.find().limit(limit).skip(offset);
  const totalProductsInDatabase = await Product.countDocuments();
  console.log(products);

  return res.json({
    data: products,
    meta: {
      total: totalProductsInDatabase,
      limit: limit,
      offset: offset,
      count: products.length,
    },
  });
};

// GET /api/v1/products/productId/ - Get product by id
exports.getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  if (!product) throw new NotFoundError("This product does not exist");
  return res.json(product);
};

// PUT /api/v1/products/productId/ - Add product to cart (by ID)
exports.addProductToCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;

  // const productName = req.body.productName;

  //errors
  // if (!productId) throw new NotFoundError("This product does not exist");

  // if (!productId) throw new BadRequestError("You must provide a productId");

  // if (!cartId) throw new NotFoundError("This cart does not exist");

  //Get cart
  const cartItems = await Product.findById(productId);
};

// DELETE /api/v1/products/productId/ - Delete product from cart (by ID)
exports.deleteProductFromCart = async (req, res, next) => {
  try {
    return res.send("Remove product from cart (by ID)"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
