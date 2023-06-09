const express = require("express");
const {
  createStoreController,
  getStoresController,
  deleteStoreController,
  getStoreByIdController,
} = require("../../controllers/store.controller");
const limiter = require("../../middlewares/limiters");
const errorHandler = require("../../middlewares/errorhandlers");
const router = express.Router();

router
  .route("/")
  .post(limiter, errorHandler, createStoreController)
  .get(limiter, errorHandler, getStoresController);

// single routes
router
  .route("/:id")
  .delete(limiter, errorHandler, deleteStoreController)
  .get(limiter, errorHandler, getStoreByIdController);
module.exports = router;
