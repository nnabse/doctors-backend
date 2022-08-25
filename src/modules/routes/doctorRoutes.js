const express = require("express");
const router = express.Router();

const { isAuthenticate } = require("../middleware/auth.middleware");

const {
  createDoctor,
  getDoctors,
} = require("../controllers/doctor.controller");

router.post("/doctor", createDoctor);
router.get("/doctor", isAuthenticate, getDoctors);

module.exports = router;
