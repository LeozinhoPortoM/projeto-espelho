const indexController = {
    // Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("index", {title: "Lista de Produtos"})
    },
};
module.exports = indexController;