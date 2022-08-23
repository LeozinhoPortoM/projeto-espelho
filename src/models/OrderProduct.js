const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const OrderProduct = db.define(
  "OrderProduct",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
    product_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
  }
);

module.exports = OrderProduct;