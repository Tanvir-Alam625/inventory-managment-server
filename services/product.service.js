const Product = require("../models/Product");

// Service: Get Products
const getProductService = async (req) => {
  const query = req.query;
  const result = await Product.find(query);
  return result;
};

// Service: Create Product
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

// Service: Get Single Product
const getSingleProductService = async (req) => {
  const { id } = req.params;
  const result = await Product.findById(id);
  return result;
};

// Service: Update Single Product
const updateProductService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );
  return result;
};

// Service: bulk update product service

const bulkUpdateProductService = async (data) => {
  const products = [];
  data?.forEach((product) => {
    products.push(
      Product.updateOne({ _id: product.id }, product.data, {
        runValidators: true,
      })
    );
  });
  const result = await Promise.all(products);
  return result;
};

module.exports = {
  getProductService,
  createProductService,
  getSingleProductService,
  updateProductService,
  bulkUpdateProductService,
};
