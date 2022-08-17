const express = require("express");
const {
  createNewOrderDetail,
  getAllOrderDetail,
  getOrderDetailById,
  updateOrderDetail,
  deleteOrderDetail,
} = require("../controllers/orderDetailController");

const router = express.Router();

router.get("/", getAllOrderDetail);
router.get("/:id", getOrderDetailById);
router.post("/", createNewOrderDetail);
router.put("/:id", updateOrderDetail);
router.delete("/:id", deleteOrderDetail);

module.exports = { router };
