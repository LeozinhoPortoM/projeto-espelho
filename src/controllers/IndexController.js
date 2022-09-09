const files = require("../helpers/files");
const upload = require("../config/upload");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Image = require("../models/Image");


const indexController = {
  // Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      const products = await Product.findAll({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "quantity",
          "category_id",
          "image_id",
        ],
        where: {
          is_active: 1,
        },
        include: [
          {
            model: Category,
            required: true,
          },
          {
            model: Image,
            required: true,
          },
        ],
      });

      if (!products) {
        throw Error("PRODUCT_NOT_FOUND");
      }
      products.map((product) => {
        if (product.Image) {
          product.Image.image = files.base64Encode(
            upload.path + product.Image.image
          );
        }
      });

      return res.render("index", {
        title: "Perfuma",
        listProducts: products,
        user: req.cookies.user,
      });
    } catch (error) {
      console.log(error);
      if (error.message === "PRODUCT_NOT_FOUND") {
        res.render("index", {
          title: "Perfuma",
          message: "Nenhum produto encontrado",
        });
      } else {
        res.render("index", {
          title: "Perfuma",
          message: "Erro ao encontrar os produtos",
        });
      }
    }
  },
};
module.exports = indexController;
