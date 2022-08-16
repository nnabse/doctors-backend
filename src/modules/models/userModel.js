const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnect");

const User = sequelize.define("Users", {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async () => await User.sync();

module.exports = User;
