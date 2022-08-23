const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const ImageProduct = db.define(
  "ImageProduct",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: Sequelize.DataTypes.BLOB('medium'),
      allowNull: false,
    },
    product_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
  }
);

module.exports = ImageProduct;