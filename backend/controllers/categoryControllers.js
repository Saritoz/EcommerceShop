const Category = require("../models/Category");

const categoryControllers = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const existCategory = await Category.findOne({ name });

      if (existCategory)
        return res
          .status(400)
          .json({
            name: "EXIST_CATEGORY",
            message: `already existed this category`,
          });

      const newCategory = new Category({ name });
      await newCategory.save();
      res
        .status(201)
        .json({
          name: "ADD_CATEGORY_SUCCESS",
          message: `create category ${name} successful`,
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ name: "GET_CATEGORY_SUCCESS", data: categories });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCategorybyId: async (req, res) => {
    try {
      const { id } = req.params;
      const { update_name } = req.body;
      if (!update_name)
        return res
          .status(400)
          .json({
            name: "REQUIRED_FIELD",
            message: "required update_name in body",
          });

      const updateData = await Category.findOneAndUpdate(
        { _id: id },
        { name: update_name }
      );
      res
        .status(200)
        .json({
          name: "UPDATE_CATEGORY_SUCCESS",
          message: `update category ${updateData.name} to ${update_name} successfully`,
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCategorybyId: async (req, res) => {
    try {
      const { id } = req.params;
      const deleteData = await Category.findOneAndRemove(
        { _id: id },
        { new: true }
      );
      deleteData.res
        .status(200)
        .json({
          name: "DELETE_CATEGORY_SUCCESS",
          message: `delete category ${deleteData.name} with id ${id} successfully`,
        });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = categoryControllers;
