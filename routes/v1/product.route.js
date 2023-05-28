const express = require("express");
const {
  getProducts,
  createProduct,
  getSingleProduct,
} = require("../../controllers/product.controller");
const limiter = require("../../middlewares/limiters");
const errorHandler = require("../../middlewares/errorhandlers");

const router = express.Router();
const allMiddleware = { limiter, errorHandler };

router
  .route("/")
  .get(limiter, errorHandler, getProducts)
  .post(limiter, errorHandler, createProduct);

// Each Single Products
router.route("/:id").get(limiter, errorHandler, getSingleProduct);

module.exports = router;
