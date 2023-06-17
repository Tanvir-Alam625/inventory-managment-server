const Brand = require("../models/Brand");
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

  // Pagination
  if (query.page) {
    const { page = 1, limit = 5 } = query;
    // suppose you have total products -> 25
    // 1. page -> 1 -> 1-5
    // 2. page -> 2 -> 6-10 => skip 1-5 -> calculation -> (2-1)*5 => 5
    // 3. page -> 3 -> 11-15 => skip 1-10 -> calculation -> (3-1)*5 => 10
    // 4. page -> 4 -> 16-20 => skip 1-15 -> calculation -> (4-1)*5 => 15
    // 5. page -> 5 -> 21-25 => skip 1-20 -> calculation -> (5-1)*5 => 20
    const skip = (+page - 1) * +limit;
    queries.skip = skip;
    queries.limit = limit;
  }

  const result = await Product.find(filters)
    .skip(queries?.skip)
    .limit(queries?.limit)
    .select(queries?.fields)
    .sort(queries?.sort);

  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, result };
};

// Service: Create Product
const createProductService = async (req) => {
  // const result  = await Product.create(req.body);
  // create with instance
  const product = new Product(req.body);
  if (product.quantity === 0 || !product.quantity) {
    product.status = "out-of-stock";
  }
  const saveProduct = await product.save();
  const { _id: productId, brand } = saveProduct;
  const updateBrand = await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  return updateBrand;
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
