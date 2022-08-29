const express = require("express");
const router = express.Router();

const { isAuthenticate } = require("../middleware/auth.middleware");

const {
  getReceptions,
  createReception,
  changeReception,
  deleteReception,
} = require("../controllers/reception.controller");

router.get("/", isAuthenticate, getReceptions);
router.post("/", isAuthenticate, createReception);
router.patch("/", changeReception);
router.delete("/", isAuthenticate, deleteReception);

module.exports = router;
