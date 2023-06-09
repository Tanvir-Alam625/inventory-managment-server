const {
  createStoreService,
  getStoresService,
  getStoreByIdService,
  deleteStoreService,
} = require("../services/store.service");

//Controller: create controller for create a store
const createStoreController = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);
    if (!result) {
      res.status(400).json({
        status: "failed",
        message: "can't create a store",
      });
    }
    res.status(201).json({
      status: "success",
      message: "store successfully created",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
//Controller: get controller for get all store
const getStoresController = async (req, res, next) => {
  try {
    const stores = await getStoresService();
    res.status(200).json({
      status: "success",
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

//Controller: get controller for get a store
const getStoreByIdController = async (req, res, next) => {
  try {
    const store = await getStoreByIdService(req.params.id);
    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
//Controller: delete controller for remove a store
const deleteStoreController = async (req, res, next) => {
  try {
    const result = await deleteStoreService(req.params.id);
    if (!result) {
      res.status(400).json({
        status: "failed",
        message: "couldn't delete a store",
      });
    }
    res.status(200).json({
      status: "success",
      message: "store successfully deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
module.exports = {
  createStoreController,
  getStoresController,
  getStoreByIdController,
  deleteStoreController,
};
