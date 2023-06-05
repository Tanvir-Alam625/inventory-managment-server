const {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.service");

// Controller: create Brand controller
const createBrandController = async (req, res) => {
  try {
    const result = await createBrandService(req.body);
    if (!result) {
      res.status(400).json({
        status: "failed",
        message: "couldn't create the brad somethings went wrong",
      });
    }
    res.status(201).json({
      status: "success",
      message: "successfully created the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't create the brand",
    });
  }
};
// Controller: get Brands controller
const getBrandsController = async (req, res) => {
  try {
    const data = await getBrandsService();

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't get the brands",
    });
  }
};
// Controller: get Brand by id controller
const getBrandByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getBrandByIdService(id);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't get a brand",
    });
  }
};
// Controller: update Brand controller
const updateBrandController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateBrandService(id, req.body);
    if (!result) {
      res.status(404).json({
        status: "failed",
        message: "couldn't found a brand",
      });
    }
    res.status(200).json({
      status: "success",
      message: "successfully updated brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "couldn't a brand",
    });
  }
};

module.exports = {
  createBrandController,
  getBrandsController,
  getBrandByIdController,
  updateBrandController,
};
