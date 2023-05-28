const express = require("express");
const {
  getProducts,
  createProduct,
  getSingleProduct,
} = require("../../controllers/product.controller");

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").get(getSingleProduct);

module.exports = router;
