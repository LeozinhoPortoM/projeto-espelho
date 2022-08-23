const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Order = db.define(
  "Order",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: Sequelize.DataTypes.ENUM("processando", "a caminho", "entregue"),
      defaultValue: "processando",
      allowNull: false,
    },
    user_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
  }
);

module.exports = Order;