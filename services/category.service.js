const Category = require("../models/Category");

// Service: create category service
const createCategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};

// Service: get category services
const getCategoriesService = async () => {
  const stocks = await Category.find({});
  return stocks;
};

//Service: get single service
const getCategoryByIdService = async (id) => {
  const stock = await Category.findById(id);
  return stock;
};

//Service: delete single service
const deleteCategoryService = async (id) => {
  const result = await Category.deleteOne({ _id: id });
  return result;
};

module.exports = {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  deleteCategoryService,
};
