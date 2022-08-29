const express = require("express");
const router = express.Router();

const { isAuthenticate } = require("../middleware/auth.middleware");

const {
  getDoctors,
} = require("../controllers/doctor.controller");

router.get("/", isAuthenticate, getDoctors);

module.exports = router;
