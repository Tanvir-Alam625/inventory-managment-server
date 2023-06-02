const express = require("express");
const {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  bulkUpdateProduct,
} = require("../../controllers/product.controller");
const limiter = require("../../middlewares/limiters");
const errorHandler = require("../../middlewares/errorhandlers");

const router = express.Router();

router
  .route("/")
  .get(limiter, errorHandler, getProducts)
  .post(limiter, errorHandler, createProduct);

// bulk update route
router.route("/bulk-update").patch(limiter, errorHandler, bulkUpdateProduct);

// Each Single Products
router
  .route("/:id")
  .get(limiter, errorHandler, getSingleProduct)
  .patch(limiter, errorHandler, updateProduct);

module.exports = router;
