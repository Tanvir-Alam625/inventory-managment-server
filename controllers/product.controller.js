const {
  getProductService,
  createProductService,
  getSingleProductService,
} = require("../services/product.service");

// Create Product Controller
const createProduct = async (req, res, next) => {
  try {
    const result = await createProductService(req);
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
    const data = await getProductService(req);
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
    const data = await getSingleProductService(req);
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
