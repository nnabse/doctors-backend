const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  updateTokens,
} = require("../controllers/user.controller");

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/updateTokens", updateTokens);

module.exports = router;
