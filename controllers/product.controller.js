const {
  getProductService,
  createProductService,
  getSingleProductService,
  updateProductService,
} = require("../services/product.service");

//ProductController: Create Product
const createProduct = async (req, res) => {
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

//ProductController: Get Product
const getProducts = async (req, res) => {
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

//ProductController: Get Single Product
const getSingleProduct = async (req, res) => {
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

//ProductController:  Update Single Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
};
