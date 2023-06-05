const express = require("express");
const limiter = require("../../middlewares/limiters");
const errorHandler = require("../../middlewares/errorhandlers");
const {
  createBrandController,
  getBrandsController,
  getBrandByIdController,
  updateBrandController,
} = require("../../controllers/brand.controller");

const router = express.Router();

router
  .route("/")
  .post(limiter, errorHandler, createBrandController)
  .get(limiter, errorHandler, getBrandsController);

//Routes: with id routes
router
  .route("/:id")
  .get(limiter, errorHandler, getBrandByIdController)
  .patch(limiter, errorHandler, updateBrandController);

module.exports = router;
