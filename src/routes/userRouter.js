const express = require("express");
const multer = require("multer");
const {
  createNewUser,
  getAllUser,
  getUserById,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", multer().single("avatar"), createNewUser);
router.put("/:id", updateUser);

module.exports = { router };
