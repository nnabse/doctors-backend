const { Sequelize, DataTypes } = require("sequelize");

const uri = "postgres://postgres:postgres@localhost:5432/doctors";
const sequelize = new Sequelize(uri);

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
