const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/Pagination");

const createNewCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newStation = await db.Category.create({
      name,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (category) {
      const { id } = req.params;
      const category = await db.Category.findByPk(id);
      db.Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).send(category);
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await db.Category.update(
      {
        name: name,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Update success",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await db.Category.findAll();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findByPk(id);
    if (!category) {
      throw new ApiError(404, "Category not found!");
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const filterCategory = async (req, res) => {};

module.exports = {
  createNewCategory,
  getAllCategory,
  getCategoryById,
  filterCategory,
  updateCategory,
  deleteCategory,
};
