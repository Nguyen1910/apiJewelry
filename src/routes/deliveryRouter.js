const express = require("express");
const {
  createNewDelivery,
  getAllDelivery,
  getDeliveryById,
  updateDelivery,
  deleteDelivery,
} = require("../controllers/deliveryController");

const router = express.Router();

router.get("/", getAllDelivery);
router.get("/:id", getDeliveryById);
router.post("/", createNewDelivery);
router.put("/:id", updateDelivery);
router.delete("/:id", deleteDelivery);

module.exports = { router };
