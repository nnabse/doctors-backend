const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnect");

const User = sequelize.define("users", {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
