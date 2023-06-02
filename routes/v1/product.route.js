const express = require("express");
const {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  bulkUpdateProducts,
  deleteSingleProduct,
  bulkDeleteProducts,
} = require("../../controllers/product.controller");
const limiter = require("../../middlewares/limiters");
const errorHandler = require("../../middlewares/errorhandlers");

const router = express.Router();
// bulk route
router
  .route("/bulk")
  .patch(limiter, errorHandler, bulkUpdateProducts)
  .delete(limiter, errorHandler, bulkDeleteProducts);

// root route
router
  .route("/")
  .get(limiter, errorHandler, getProducts)
  .post(limiter, errorHandler, createProduct);

// Each Single Products
router
  .route("/:id")
  .get(limiter, errorHandler, getSingleProduct)
  .patch(limiter, errorHandler, updateProduct)
  .delete(limiter, errorHandler, deleteSingleProduct);

module.exports = router;
