const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/user.controller");

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);

module.exports = router;
