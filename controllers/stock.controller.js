const {
  createStockService,
  getStocksService,
  getStockByIdService,
  deleteStockService,
} = require("../services/stock.service");

//Controller: create stock controller for create a stock
const createStockController = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);
    if (result) {
      res.status(201).json({
        status: "success",
        message: "stock created successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error,
    });
  }
};

//Controller: get stocks controller for get all stocks
const getStocksController = async (req, res, next) => {
  try {
    const stocks = await getStocksService();
    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error,
    });
  }
};

//Controller: get stock controller for get single stock
const getStockByIdController = async (req, res, next) => {
  try {
    const stock = await getStockByIdService(req?.params?.id);
    res.status(200).json({ status: "status", data: stock });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error,
    });
  }
};

// Controller: delete stock controller for delete a stock
const deleteStockController = async (req, res, next) => {
  try {
    const result = await deleteStockService(req.params.id);
    if (result) {
      res.status(200).json({
        status: "success",
        message: "stock successfully deleted",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error,
    });
  }
};

module.exports = {
  createStockController,
  getStocksController,
  getStockByIdController,
  deleteStockController,
};
