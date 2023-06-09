const Store = require("../models/Store");

//Service: create store service for create a service
const createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

//Service: get store service for get all service
const getStoresService = async () => {
  const stores = await Store.find({});
  return stores;
};
//Service: get store service for get all service
const getStoreByIdService = async (id) => {
  const store = await Store.findOne({ _id: id });
  return store;
};
//Service: delete store service for remove a service
const deleteStoreService = async (id) => {
  const result = await Store.deleteOne({ _id: id });
  return result;
};
module.exports = {
  createStoreService,
  getStoresService,
  getStoreByIdService,
  deleteStoreService,
};
