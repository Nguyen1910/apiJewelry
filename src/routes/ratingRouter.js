const express = require("express");
const {
  createNewRating,
  getAllRating,
  getRatingById,
  updateRating,
  deleteRating,
} = require("../controllers/ratingController");

const router = express.Router();

router.get("/", getAllRating);
router.get("/:id", getRatingById);
router.post("/", createNewRating);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);

module.exports = { router };
