const { Sequelize } = require("sequelize");

const uri = "postgres://postgres:postgres@localhost:5432/doctors";

const sequelize = new Sequelize(uri);

module.exports = sequelize;
