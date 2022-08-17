const express = require("express");
const {
  createNewBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

const router = express.Router();

router.get("/", getAllBrand);
router.get("/:id", getBrandById);
router.post("/", createNewBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

module.exports = { router };
