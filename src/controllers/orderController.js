const { sequelize } = require("../models/index");
const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/Pagination");

const createNewOrder = async (req, res) => {
  try {
    const {
      allCodeId,
      firstName,
      lastName,
      email,
      phone,
      address,
      total,
      userId,
    } = req.body;
    const newStation = await db.Order.create({
      allCodeId,
      firstName,
      lastName,
      email,
      phone,
      address,
      total,
      userId,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await db.Order.findByPk(id);
    console.log(order);
    if (order) {
      await db.OrderDetail.destroy({
        where: {
          orderId: id,
        },
      });
      await db.Order.destroy({
        where: {
          id,
        },
      });
      res.status(200).send("delete success");
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      allCodeId,
      firstName,
      lastName,
      email,
      phone,
      address,
      total,
      deliveryId,
    } = req.body;
    await db.Order.update(
      {
        allCodeId,
        firstName,
        lastName,
        email,
        phone,
        address,
        total,
        deliveryId,
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

const getAllOrder = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const order = await Pagination(db.Order, page, limit);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await db.Order.findByPk(id);
    if (!order) {
      throw new ApiError(404, "Order not found!");
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const order = await db.Order.findAll({
      where: { userId },
    });
    if (!order) {
      throw new ApiError(404, "Order not found!");
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterOrders = async (req, res) => {};

module.exports = {
  createNewOrder,
  getAllOrder,
  getOrderById,
  filterOrders,
  updateOrder,
  deleteOrder,
  getOrderByUserId,
};
