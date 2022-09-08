const { sequelize } = require("../models/index");
const { QueryTypes } = require("sequelize");
const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/Pagination");

const createNewDelivery = async (req, res) => {
  try {
    const { userId, orderId, description } = req.body;
    console.log(userId, orderId, description);
    const newStation = await db.Delivery.create({
      userId,
      description,
      orderId,
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
    const { userId, orderId, description } = req.body;
    await db.Delivery.update(
      {
        userId,
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

const getDeliveryOrderById = async (req, res) => {
  try {
    const { userId } = req.params;
    const deliveryOrder = await sequelize.query(
      "select orders.id, orders.allCodeId, concat(orders.lastName,' ',orders.firstName) as name, orders.address, orders.phone, orders.total, orders.userId, orders.deliveryId, deliveries.description from orders inner join deliveries on orders.deliveryId = deliveries.id where deliveries.userId = :userId",
      {
        replacements: { userId: userId },
        type: QueryTypes.SELECT,
      }
    );
    if (!deliveryOrder) {
      throw new ApiError(404, "Order not found!");
    }
    res.status(200).json(deliveryOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterDelivery = async (req, res) => {};

module.exports = {
  createNewDelivery,
  getAllDelivery,
  getDeliveryById,
  getDeliveryOrderById,
  filterDelivery,
  updateDelivery,
  deleteDelivery,
};
