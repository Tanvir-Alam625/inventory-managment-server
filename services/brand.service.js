const Brand = require("../models/Brand");
// Service: create a brand service
const createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};
// Service: get brands service
const getBrandsService = async () => {
  const brands = await Brand.find({});
  return brands;
};
// Service: get a brand by Id service
const getBrandByIdService = async (id) => {
  const brand = await Brand.findById(id).populate("products");
  return brand;
};
// Service: update brand service
const updateBrandService = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};

module.exports = {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService,
};
