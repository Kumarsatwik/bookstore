const categoryModel = require("../models/category.model");

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await categoryModel.create({ name });
    return res.status(201).json({ category });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find({});
    return res.status(200).json({ categories });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
