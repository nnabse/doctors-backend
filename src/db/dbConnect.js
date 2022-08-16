const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_LINK);

module.exports = sequelize;
