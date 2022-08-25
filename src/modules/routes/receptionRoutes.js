const express = require("express");
const router = express.Router();

const { isAuthenticate } = require("../middleware/auth.middleware");

const {
  getReceptions,
  createReception,
  changeReception,
  deleteReception,
} = require("../controllers/reception.controller");

router.get("/receptions", isAuthenticate, getReceptions);
router.post("/receptions", isAuthenticate, createReception);
router.patch("/receptions", changeReception);
router.delete("/receptions", isAuthenticate, deleteReception);

module.exports = router;
