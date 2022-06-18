const fs = require('fs');
const path = require('path');
const filePath = path.join('produtos.json');

const ProductController = {

    // Lista todos os produtos
    // Pode retornar uma página ou não
    index: (req, res) => {
        let produtos = fs.readFileSync(filePath, { encoding: "utf-8" });
        produtos = JSON.parse(produtos);
        
        return res.render("products", { title: "Lista de Produtos", listaProdutos: produtos });
    },
    // Mostra um produto
    // Pode retornar uma página ou não
    show: (req, res) => {
        let { id } = req.params;
        res.send(`Produto ${id}`);
    },
    // Página de exibição para criar produto através de um formulário
    viewCreateForm: (req, res) => {
        return res.render('createProduct', { title: "Criar Produtos" })
    },
    // Página para criar produto
    create: (req, res) => {
        // Salvar no banco
        let produtos = fs.readFileSync(filePath, { encoding: "utf-8" });
        produtos = JSON.parse(produtos);
        // Salvar no banco
        let { nome, preco, descricao } = req.body;
        let dadosJson = { nome, preco, descricao };

        let newProduct = {...produtos,...dadosJson};
        let newProductString = JSON.stringify(newProduct, null, 2);
        fs.appendFileSync(filePath, newProductString);
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
        let produtos = [{id:1, nome:"Produto X", preco: 20, descricao: "Da hora"},{id:2, nome:"Produto Y", preco: 20, descricao: "Da hora"},]
        res.render('editProduct', { title: "Editar Pordutos", produto: produtos[id] });
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