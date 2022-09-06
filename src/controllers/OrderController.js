const { validationResult } = require("express-validator");

const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const orderController = {
  index: async (req, res) => {
    const { id } = req.params;

    try {
      const { page = 1 } = req.query;
      const { count: total, rows: orders } = await Order.findAndCountAll({
        attributes: ["id", "status", "is_active"],
        where: {
          is_active: 1,
        },
        limit: 6,
        offset: (page - 1) * 6,
        order: [["id", "ASC"]],
      });
      const totalPage = Math.round(total / 5);
      if (!orders) {
        throw Error("ORDER_NOT_FOUND");
      }
      return res.render("orders", {
        title: "Lista de pedidos",
        listOrders: orders,
        totalPage,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "ORDER_NOT_FOUND") {
        res.render("orders", {
          title: "Pedido",
          message: "Nenhum pedido encontrado",
        });
      } else {
        res.render("orders", {
          title: "Pedido",
          message: "Erro ao encontrar os pedidos",
        });
      }
    }
  },

  show: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findAll({
        attributes: ["id", "status", "is_active"],
        where: {
          id,
        },
        include: {
          model: Product,
          required: true,
        },
      });

      if (!order) {
        throw Error("ORDER_NOT_FOUND");
      }
      order.map(order => console.log(order.Products));

      return res.render("orders-products", {
        title: "Visualizar pedido",
        order,
      });
    } catch (error) {
      if (error.message === "ORDER_NOT_FOUND") {
        res.render("order-products", {
          title: "Pedido",
          message: "Pedido não encontrado!",
        });
      } else {
        res.render("order-products", {
          title: "Pedido",
          message: "Erro ao encontrar pedido!",
        });
      }
    }
  },

  create: (req, res) => {
    return res.render("order-create", {
      title: "Cadastrar pedido",
      user: req.cookies.user,
    });
  },

  store: async (req, res) => {
    const errors = validationResult(req);
    const { nome, descricao } = req.body;

    if (!errors.isEmpty()) {
      return res.render("order-create", {
        title: "Cadastrar pedido",
        errors: errors.mapped(),
        old: req.body,
      });
    }

    try {
      const orderExists = await Order.findOne({
        attributes: ["name"],
        where: {
          name: nome,
        },
      });

      if (orderExists) {
        return res.render("order-create", {
          title: "Error",
          errors: {
            nome: {
              msg: "Este pedido já está registrado",
            },
          },
          old: req.body,
        });
      }
      const order = await Order.create({
        name: nome,
        description: descricao,
      });
      res.render("order-create", {
        title: "Sucesso",
        message: `Pedido ${order.name} foi cadastrado com sucesso!`,
      });
    } catch (error) {
      res.render("order-create", {
        title: "Erro",
        message: "Erro ao cadastrar pedido!",
      });
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;

    try {
      const order = await Order.findOne({
        attributes: ["id", "name", "description"],
        where: {
          id,
        },
      });

      if (!order) {
        throw Error("ORDER_NOT_FOUND");
      }

      return res.render("order-edit", {
        title: "Editar pedido",
        user: req.cookies.user,
        order,
      });
    } catch (error) {
      if (error.message === "ORDER_NOT_FOUND") {
        res.render("order-edit", {
          title: "Editar pedido",
          message: "Nenhuma pedido encontrado",
        });
      } else {
        res.render("order-edit", {
          title: "Editar pedido",
          message: "Erro ao editar pedido",
        });
      }
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const order = await Order.update(
        {
          name: nome,
          description: descricao,
        },
        {
          where: { id },
        }
      );

      if (!order) {
        throw Error("ORDER_NOT_FOUND");
      }

      res.render("order-edit", {
        title: "Sucesso",
        message: `Pedido foi atualizado com sucesso!`,
        user: req.cookies.user,
        order,
      });
    } catch (error) {
      if (error.message === "ORDER_NOT_FOUND") {
        res.render("order-edit", {
          title: "Pedido",
          message: "Nenhum pedido encontrado",
        });
      } else {
        res.render("order-edit", {
          title: "Pedido",
          message: "Erro ao editar pedido",
        });
      }
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const order = await Order.findOne({
        attributes: ["id", "name", "description"],
        where: {
          id,
        },
      });

      if (!order) {
        throw Error("ORDER_NOT_FOUND");
      }

      return res.render("order-delete", {
        title: "Deletar pedido",
        order,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "ORDER_NOT_FOUND") {
        res.render("order-delete", {
          title: "Pedido",
          errors: { message: "Nenhum pedido encontrad" },
        });
      } else {
        res.render("order-delete", {
          title: "Pedido",
          errors: { message: "Erro ao deletar pedido" },
        });
      }
    }
  },
  // O método acima pode ser chamado de destroy
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.update(
        {
          is_active: 0,
        },
        {
          where: { id },
        }
      );

      return res.render("order-delete", {
        title: "Deletar pedido",
        message: "Pedido deletado com sucesso!",
      });
    } catch (error) {
      res.render("order-delete", {
        title: "Deletar pedido",
        errors: { message: "Erro ao deletar pedido" },
      });
    }
  },
};

module.exports = orderController;
