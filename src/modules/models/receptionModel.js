const { DataTypes } = require("sequelize");
const sequelize = require("../../db/dbConnect");

const Reception = sequelize.define("Receptions", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complaints: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Reception;
