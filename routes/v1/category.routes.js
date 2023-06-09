const express = require("express");

const limiter = require("../../middlewares/limiters");
const errorHandler = require("../../middlewares/errorhandlers");
const {
  createCategoryController,
  getCategoriesController,
  deleteCategoryController,
  getCategoryByIdController,
} = require("../../controllers/category.controller");
const router = express.Router();

router
  .route("/")
  .post(limiter, errorHandler, createCategoryController)
  .get(limiter, errorHandler, getCategoriesController);

// single routes
router
  .route("/:id")
  .delete(limiter, errorHandler, deleteCategoryController)
  .get(limiter, errorHandler, getCategoryByIdController);
module.exports = router;
