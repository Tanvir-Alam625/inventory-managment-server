const Stock = require("../models/Stock");

// Service: create stock service
const createStockService = async (data) => {
  const result = await Stock.create(data);
  return result;
};

// Service: get stock services
const getStocksService = async () => {
  const stocks = await Stock.find({});
  return stocks;
};

//Service: get single service
const getStockByIdService = async (id) => {
  const stock = await Stock.findById(id);
  return stock;
};

//Service: delete single service
const deleteStockService = async (id) => {
  const result = await Stock.deleteOne({ _id: id });
  return result;
};

module.exports = {
  createStockService,
  getStocksService,
  getStockByIdService,
  deleteStockService,
};
