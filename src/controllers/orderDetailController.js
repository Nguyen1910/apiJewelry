const db = require("../models/index");
const ApiError = require("../utils/ApiError");
const Pagination = require("../utils/Pagination");

const createNewOrderDetail = async (req, res) => {
  try {
    const { productId, orderId, amount } = req.body;
    const newStation = await db.OrderDetail.create({
      productId,
      orderId,
      amount,
    });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOrderDetail = async (req, res) => {
  const { id } = req.params;
  const order = await db.OrderDetail.findByPk(id);
  if (order) {
    db.OrderDetail.destroy({
      where: {
        orderId: id,
      },
    });
    db.OrderDetail.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(order);
  } else {
    res.status(404).send("not found");
  }
};

const updateOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, orderId, amount } = req.body;
    await db.OrderDetail.update(
      {
        amount,
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
    res.status(500).send(error);
  }
};

const getAllOrderDetail = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const orderDetail = await Pagination(db.OrderDetail, page, limit);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOrderDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetail = await db.OrderDetail.findAll({
      where: { orderId: id },
    });
    if (!orderDetail) {
      throw new ApiError(404, "OrderDetail not found");
    }
    res.status(200).json(orderDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterOrderDetail = async (req, res) => {};

module.exports = {
  createNewOrderDetail,
  getAllOrderDetail,
  getOrderDetailById,
  filterOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
