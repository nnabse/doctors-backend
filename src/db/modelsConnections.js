const { DataTypes } = require("Sequelize");

const User = require("../modules/models/userModel");
const Reception = require("../modules/models/receptionModel");
const Doctor = require("../modules/models/doctorModel");

User.hasMany(Reception, {
  foreignKey: { type: DataTypes.INTEGER, allowNull: false },
});
Reception.belongsTo(User);

Doctor.hasMany(Reception, {
  foreignKey: { type: DataTypes.INTEGER, allowNull: false },
});
Reception.belongsTo(Doctor);

module.exports = { User, Doctor, Reception };
