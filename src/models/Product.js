const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Product = db.define(
    "Product",
    {
        id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
        },
        price: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0,
        },
        category_id: {
            type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        },

    },
    {

    }

);

module.exports = Product;
