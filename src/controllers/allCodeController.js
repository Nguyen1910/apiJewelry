const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/pagination");

const createNewCode = async (req, res) => {
  try {
    const { key, type, value } = req.body;
    const newStation = await db.AllCode.create({
      key,
      type,
      value,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCode = async (req, res) => {
  try {
    const { id } = req.params;
    const code = await db.AllCode.findByPk(id);
    if (code) {
      db.AllCode.destroy({
        where: {
          id,
        },
      });
      res.status(200).send(code);
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { key, type, value } = req.body;
    await db.AllCode.update(
      {
        key,
        type,
        value,
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

const getAllCode = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const code = await Pagination(db.AllCode, page, limit);
    res.status(200).json(code);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const code = await db.AllCode.findByPk(id);
    if (!code) {
      throw new ApiError(404, "Code not found!");
    }
    res.status(200).json(code);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCodeByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const code = await Pagination(db.AllCode, page, limit, { key });
    if (!code) {
      throw new ApiError(404, "code not found!");
    }
    res.status(200).json(code);
  } catch (error) {
    res.status(500).json(error);
  }
};

const filterCode = async (req, res) => {};

module.exports = {
  createNewCode,
  getAllCode,
  getCodeById,
  getCodeByKey,
  filterCode,
  updateCode,
  deleteCode,
};
