const express = require("express");
const {
  createNewOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getAllOrder);
router.get("/:id", getOrderById);
router.post("/", createNewOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = { router };
