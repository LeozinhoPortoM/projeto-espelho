const files = require("../helpers/files");
const { validationResult } = require("express-validator");
const upload = require("../config/upload");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Image = require("../models/Image");

const productController = {
  // Lista todos os produtos
  // Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const { count: total, rows: products } = await Product.findAndCountAll({
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
        limit: 6,
        offset: (page - 1) * 6,
        order: [["name", "ASC"]],
      });
      const totalPage = Math.round(total / 5);

      if (!products) {
        throw Error("PRODUCT_NOT_FOUND");
      }

      products.map(product => console.log(product.Images));
      // products.map((product) => {
      //   if (product.Images.image) {
      //     product.Images.image = files.base64Encode(upload.path + product.Images.image);
      //   }
      // });

      return res.render("products", {
        title: "Lista de produtos",
        listProducts: products,
        totalPage,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        res.render("products", {
          title: "Produtos",
          message: "Nenhum produto encontrado",
        });
      } else {
        res.render("products", {
          title: "Produtos",
          message: "Erro ao encontrar os produtos",
        });
      }
    }
  },

  // Mostra um produto
  // Pode retornar uma página ou não
  show: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findOne({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "quantity",
          "category_id",
        ],
        where: {
          id,
        },
        include: {
          model: Order,
          required: true,
        },
      });

      if (!product) {
        throw Error("PRODUCT_NOT_FOUND");
      }

      //   product.image = files.base64Encode(upload.path + product.image);

      return res.render("product", {
        title: "Visualizar Produto",
        product,
      });
    } catch (error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        res.render("product", {
          title: "Produto",
          message: "Produto não encontrado!",
        });
      } else {
        res.render("product", {
          title: "Produto",
          message: "Erro ao encontrar produto!",
        });
      }
    }
  },

  // Página para criar produto
  create: (req, res) => {
    return res.render("product-create", {
      title: "Cadastrar produto",
      user: req.cookies.user,
    });
  },
  // Cria produto
  // Não retorna página
  store: async (req, res) => {
    const errors = validationResult(req);
    const { nome, descricao, preco, categoria, quantidade } = req.body;

    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(upload.path + req.file.filename);
      }
      return res.render("product-create", {
        title: "Cadastrar produto",
        errors: errors.mapped(),
        old: req.body,
      });
    }

    // Atribui a variavel filename uma imagem default
    let filename = "product-default.jpeg";

    // Atribui ao produto uma imagem default caso tenha tido algo de errado no download
    if (req.file) {
      filename = req.file.filename;
    }

    try {
      const productExists = await Product.findOne({
        attributes: ["name"],
        where: {
          name: nome,
        },
      });

      if (productExists) {
        return res.render("product-create", {
          title: "Error",
          errors: {
            nome: {
              msg: "Este produto já está registrado",
            },
          },
          old: req.body,
        });
      }
      const products = await Product.create({
        name: nome,
        description: descricao,
        price: preco,
        quantity: quantidade,
        category_id: categoria,
      });
      res.render("product-create", {
        title: "Sucesso",
        message: `Produto ${products.name} foi cadastrado com sucesso!`,
      });
    } catch (error) {
      res.render("product-create", {
        title: "Erro",
        message: "Erro ao cadastrar produto!",
      });
    }
  },

  // Página para editar produto
  edit: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findOne({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "quantity",
          "category_id",
        ],
        where: {
          id,
        },
        // include: {
        //   model: Category,
        //   required: true,
        // },
      });
      if (!product) {
        throw Error("PRODUCT_NOT_FOUND");
      }

      return res.render("product-edit", {
        title: "Editar usuário",
        user: req.cookies.user,
        product,
      });
    } catch (error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        res.render("product-edit", {
          title: "Produto",
          message: "Nenhum produto encontrado",
        });
      } else {
        res.render("product-edit", {
          title: "Produto",
          message: "Erro ao editar os produtos",
        });
      }
    }
  },
  // Edita produto
  // Não retorna página
  update: async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, categoria, quantidade } = req.body;

    let filename;
    if (req.file) {
      filename = req.file.filename;
    }

    try {
      const product = await Product.update(
        {
          name: nome,
          description: descricao,
          price: preco,
          quantity: quantidade,
          category_id: categoria,
        },
        {
          where: { id },
        }
      );

      if (!product) {
        throw Error("PRODUCT_NOT_FOUND");
      }

      res.render("product-edit", {
        title: "Sucesso",
        message: `Produto foi atualizado com sucesso!`,
        user: req.cookies.user,
        product,
      });
    } catch (error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        res.render("product-edit", {
          title: "Produto",
          message: "Nenhum produto encontrado",
        });
      } else {
        res.render("product-edit", {
          title: "Produto",
          message: "Erro ao editar os produtos",
        });
      }
    }
  },
  // Deleta produto
  // Não retorna página
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findOne({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "quantity",
          "category_id",
        ],
        where: {
          id,
        },
      });

      if (!product) {
        throw Error("PRODUCT_NOT_FOUND");
      }

      // products.image = files.base64Encode(upload.path + products.image);

      return res.render("product-delete", {
        title: "Deletar produto",
        product,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        res.render("product-delete", {
          title: "Produto",
          errors: { message: "Nenhum produto encontrado" },
        });
      } else {
        res.render("product-delete", {
          title: "Produto",
          errors: { message: "Erro ao deletar produto" },
        });
      }
    }
  },
  // O método acima pode ser chamado de destroy
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.update(
        {
          is_active: 0,
        },
        {
          where: { id },
        }
      );

      return res.render("product-delete", {
        title: "Produto deletado",
        message: "Produto deletado com sucesso!",
      });
    } catch (error) {
      res.render("product-delete", {
        title: "Produto",
        errors: { message: "Erro ao deletar produto" },
      });
    }
  },

  viewProduct: (req, res) => {
    res.render("description-product", {
      title: "Produto",
      user: req.cookies.user,
    });
  },

  viewPayment: (req, res) => {
    res.render("product-payment", {
      title: "Pagamento",
      user: req.cookies.user,
    });
  },

  viewFinishPayment: (req, res) => {
    res.render("finished-product-payment", {
      title: "Compra finalizada",
      user: req.cookies.user,
    });
  },
};
module.exports = productController;
