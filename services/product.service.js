const Product = require("../models/Product");

// Service: Get Products
const getProductService = async (query) => {
  let filters = { ...query };
  const excludeFields = ["page", "limit", "sort", "fields"];
  excludeFields.forEach((field) => delete filters[field]);
  // URL Query-> price[gte]=500
  // Query: gt, lt, gte, lte
  let filtersString = JSON.stringify(filters);
  filtersString = filtersString.replace(
    /\b(gt|lt|gte|lte)\b/g,
    (match) => `$${match}`
  );
  filters = JSON.parse(filtersString);

  const queries = {};
  // URL Ascending Query-> sort=price%quantity%title
  // URL Descending Query-> sort=-price%-quantity%-title
  // Sorting Logic
  if (query.sort) {
    const sort = query.sort.split("%").join(" ");
    queries.sort = sort;
  }
  // URL With Fields Query-> fields=title%price%rating%image
  // URL Without Fields Query-> fields=-title%-price%-rating%-image
  // projection Logic
  if (query.fields) {
    const fields = query.fields.split("%").join(" ");
    queries.fields = fields;
  }

  const result = await Product.find(filters)
    .select(queries?.fields)
    .sort(queries?.sort);
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

const bulkUpdateProductsService = async (data) => {
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

// Service: Delete Single Product
const deleteSingleProductService = async (id) =>
  await Product.deleteOne({ _id: id });

// Service: Delete Bulk Product
const bulkDeleteProductService = async (ids) =>
  await Product.deleteMany({ _id: ids });
module.exports = {
  getProductService,
  createProductService,
  getSingleProductService,
  updateProductService,
  bulkUpdateProductsService,
  deleteSingleProductService,
  bulkDeleteProductService,
};
