const express = require("express");
const multer = require("multer");
const {
  createNewUser,
  getAllUser,
  getUserById,
  updateUser,
  login,
  getAllStaff,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUser);
router.get("/staff", getAllStaff);
router.get("/:id", getUserById);
router.post("/login", login);
router.post("/", multer().single("avatar"), createNewUser);
router.put("/:id", updateUser);

module.exports = { router };
