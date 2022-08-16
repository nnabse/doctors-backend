const { Sequelize, DataTypes } = require("sequelize");

const uri = "postgres://postgres:postgres@localhost:5432/doctors";
const sequelize = new Sequelize(uri);

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

async () => await Reception.sync();

module.exports = Reception;
