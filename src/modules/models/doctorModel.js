const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnect");

const Doctor = sequelize.define("Doctors", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Doctor;
