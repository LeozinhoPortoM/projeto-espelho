const products = [
    {
        id: 1,
        nome: "Blusa azul",
        descricao: "Blusa muito fashion",
        preco: 89.99,
        tamanho: "G",
    },
    {
        id: 2,
        nome: "Blusa amarela",
        descricao: "Blusa muito fashion amarela",
        preco: 69.99,
        tamanho: "M",
    },
    {
        id: 3,
        nome: "Blusa Rosa",
        descricao: "Blusa de roqueiro",
        preco: 49.99,
        tamanho: "PP",
    },
    {
        id: 4,
        nome: "Blusa Dark",
        descricao: "Blusa trevosa",
        preco: 209.99,
        tamanho: "M",
    },
    {
        id: 5,
        nome: "Blusa Light",
        descricao: "Blusa iluminada, contem led",
        preco: 79.99,
        tamanho: "G",
    },
    {
        id: 6,
        nome: "Blusa Doce",
        descricao: "Blusa que gruda",
        preco: 19.99,
        tamanho: "G",
    },
];

const ProductController = {

    // Lista todos os produtos
    // Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("products", { title: "Lista de Produtos", listProducts: products });
    },
    // Mostra um produto
    // Pode retornar uma página ou não
    show: (req, res) => {
        const { id } = req.params;
        const productResult = products.find(product => product.id === parseInt(id));

        if (!productResult) {
            return res.render("not-found", { title: "Erro", message: "Erro ao encontar produto" });
        }
        return res.render("product", { title: "Visualizar produto", product: productResult });
    },
    // Página de exibição para criar produto através de um formulário
    viewCreateForm: (req, res) => {
        return res.render('product-create', { title: "Criar Produtos" })
    },
    // Página para criar produto
    create: (req, res) => {
        // Salvar no banco
        let { nome, preco, descricao } = req.body;
        return res.send(`O produto: ${nome} foi criado com sucesso!!`);
    },
    // Cria produto
    // Não retorna página
    store: (req, res) => {
        let { id } = req.params;
    },
    // Página de exibição para alterar produto
    viewEditForm: (req, res) => {
        let { id } = req.params;
        res.render('product-edit', { title: "Editar Pordutos", produto: produtos[id] });
    },
    // Página para editar produto
    edit: (req, res) => {
        let { name, preco, descricao } = req.body;
        return res.send(`Você editou o produto ${name}`);
    },
    // Edita produto
    // Não retorna página
    update: (req, res) => {
        let { id } = req.params;
    },
    // Deleta produto
    // Não retorna página
    delete: (req, res) => {
        let { id } = req.params;
        res.send(`Estou deletando o produto com o id: ${id}`);
    },
    // O método acima pode ser chamado de destroy
    // destroy: (req, res)=>{},
};
module.exports = ProductController;