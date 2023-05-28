const Product = require("../models/Product");

// Create Product Controller
const createProduct = async (req, res, next) => {
  try {
    // const result  = await Product.create(req.body);
    // create with instance
    const product = new Product(req.body);
    if (product.quantity === 0 || !product.quantity) {
      product.status = "out-of-stock";
    }
    const result = await product.save();
    res.status(200).json({
      status: "success",
      message: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Get Product Controller
const getProducts = async (req, res, next) => {
  try {
    const query = req.query;
    const data = await Product.find(query).limit(2);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

// Get Single Product
const getSingleProduct = async (req, res, next) => {
  try {
    const params = req.params.id;
    const data = await Product.findById(params);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = { createProduct, getProducts, getSingleProduct };
