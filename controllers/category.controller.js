const {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  deleteCategoryService,
} = require("../services/category.service");

//Controller: create category controller for create a category
const createCategoryController = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
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

//Controller: get categories controller for get all categories
const getCategoriesController = async (req, res, next) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error,
    });
  }
};

//Controller: get category controller for get single category
const getCategoryByIdController = async (req, res, next) => {
  try {
    const category = await getCategoryByIdService(req?.params?.id);
    res.status(200).json({ status: "status", data: category });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: error,
    });
  }
};

// Controller: delete category controller for delete a category
const deleteCategoryController = async (req, res, next) => {
  try {
    const result = await deleteCategoryService(req.params.id);
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
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  deleteCategoryController,
};
