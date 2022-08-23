const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateAccessToken = (login) => {
  return jwt.sign(login, process.env.SECRET, { expiresIn: "30m" });
};

const generateRefreshToken = (login) => {
  return jwt.sign(login, process.env.SECRET, { expiresIn: "15d" });
};

module.exports = { generateAccessToken, generateRefreshToken };
