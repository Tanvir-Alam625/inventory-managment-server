const express = require("express");
const limiter = require("../../middlewares/limiters");
const errorHandler = require("../../middlewares/errorhandlers");
const {
  createStockController,
  getStocksController,
  deleteStockController,
  getStockByIdController,
} = require("../../controllers/stock.controller");
const router = express.Router();
// root routes
router
  .route("/")
  .post(limiter, errorHandler, createStockController)
  .get(limiter, errorHandler, getStocksController);

// single routes
router
  .route("/:id")
  .delete(limiter, errorHandler, deleteStockController)
  .get(limiter, errorHandler, getStockByIdController);

module.exports = router;
