const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnect");

const Doctor = sequelize.define("doctors", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Doctor;
