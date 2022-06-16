const productController = {
    // Lista todos os produtos
    // Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("products", {title: "Lista de Produtos"})
    },
    // Mostra um produto
    // Pode retornar uma página ou não
    show: (req, res) => { 
        // Criar uma view e route para esse controller
        // O router deve ter o seguinte caminho
        // http://localhost:3000/product/:id
     },
    // Página para criar produto
    create: (req, res) => { 
        // Criar uma view e route para esse controller
        // O router deve ter o seguinte caminho
        // GET http://localhost:3000/product/create
        // A view deve mostrar a frase "Página para Criar produto"
    },
    // Cria produto
    // Não retorna página
    store: (req, res) => { },
    // Página para editar produto
    edit: (req, res) => { },
    // Edita produto
    // Não retorna página
    update: (req, res) => { },
    // Deleta produto
    // Não retorna página
    delete: (req, res) => { },
    // O método acima pode ser chamado de destroy
    // destroy: (req, res)=>{},
};
module.exports = productController;