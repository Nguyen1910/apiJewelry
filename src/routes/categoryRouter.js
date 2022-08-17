const express = require("express");
const {
  createNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.post("/", createNewCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = { router };
