const Product = require("../models/Product");

const getProductService = async (req) => {
  const query = req.query;
  const result = await Product.find(query);
  return result;
};

const createProductService = async (req) => {
  // const result  = await Product.create(req.body);
  // create with instance
  const product = new Product(req.body);
  if (product.quantity === 0 || !product.quantity) {
    product.status = "out-of-stock";
  }
  const result = await product.save();
  return result;
};

const getSingleProductService = async (req) => {
  const params = req.params.id;
  const result = await Product.findById(params);
  return result;
};

module.exports = {
  getProductService,
  createProductService,
  getSingleProductService,
};
