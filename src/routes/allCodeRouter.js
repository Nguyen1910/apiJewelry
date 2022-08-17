const express = require("express");
const {
  createNewCode,
  getAllCode,
  getCodeById,
  getCodeByKey,
  updateCode,
  deleteCode,
} = require("../controllers/allCodeController");

const router = express.Router();

router.get("/", getAllCode);
router.get("/:id", getCodeById);
// router.get("/", getCodeByKey);
router.post("/", createNewCode);
router.put("/:id", updateCode);
router.delete("/:id", deleteCode);

module.exports = { router };
