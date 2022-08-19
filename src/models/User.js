const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(100),
      // Não permite valor nulo
      // Por padrão ele permite nulo
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    birthdate: {
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;