const express = require("express");
const router = express.Router();

const {
  getReceptions,
  createReception,
  changeReception,
  deleteReception,
} = require("../controllers/receptions.controller");

router.get("/getReceptions", getReceptions);
router.post("/createReception", createReception);
router.patch("/changeReception", changeReception);
router.delete("/deleteReception", deleteReception);

module.exports = router;
