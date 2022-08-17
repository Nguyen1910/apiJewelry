const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/pagination");

const createNewDelivery = async (req, res) => {
  try {
    const { staffId, orderId, description } = req.body;
    const newStation = await db.Delivery.create({
      staffId,
      orderId,
      description,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await db.Delivery.findByPk(id);
    if (delivery) {
      db.Delivery.destroy({
        where: {
          id,
        },
      });
      res.status(200).send(delivery);
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    ré.status(500).send(error);
  }
};

const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { staffId, orderId, description } = req.body;
    await db.Delivery.update(
      {
        staffId,
        orderId,
        description,
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
    res.status(500).json({ error });
  }
};

const getAllDelivery = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const delivery = await Pagination(db.Delivery, page, limit);
    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await db.Delivery.findByPk(id);
    if (!delivery) {
      throw new ApiError(404, "Delivery not found!");
    }
    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterDelivery = async (req, res) => {};

module.exports = {
  createNewDelivery,
  getAllDelivery,
  getDeliveryById,
  filterDelivery,
  updateDelivery,
  deleteDelivery,
};
