const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/pagination");

const createNewBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const newStation = await db.Brand.create({
      name,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const brand = await db.Brand.findByPk(id);
    console.log(brand);
    if (brand) {
      db.Brand.destroy({
        where: {
          id,
        },
      });
      res.status(200).send(brand);
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await db.Brand.update(
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

const getAllBrand = async (req, res) => {
  try {
    // const { page, limit } = req.query;
    const brand = await db.Brand.findAll();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await db.Brand.findByPk(id);
    if (!brand) {
      throw new ApiError(404, "Brand not found!");
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json(error);
  }
};

const filterBrands = async (req, res) => {};

module.exports = {
  createNewBrand,
  getAllBrand,
  getBrandById,
  filterBrands,
  updateBrand,
  deleteBrand,
};
