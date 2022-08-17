const express = require("express");
const multer = require("multer");
const {
  createNewProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  filterProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getAllProduct);
router.post("/filter", filterProduct);
router.get("/:id", getProductById);
router.post("/", multer().array("image", 4), createNewProduct);
router.put("/:id", multer().array("image", 4), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = { router };
