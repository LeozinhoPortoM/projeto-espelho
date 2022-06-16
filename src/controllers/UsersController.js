const usersController = {
    // Lista todos os usuário
    // Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("users", {title: "Lista de Produtos"})
    },
    // Mostra um usuário
    // Pode retornar uma página ou não
    show: (req, res) => { },
    // Página para criar usuário
    create: (req, res) => { },
    // Cria usuário
    // Não retorna página
    store: (req, res) => { },
    // Página para editar usuário
    edit: (req, res) => { },
    // Edita usuário
    // Não retorna página
    update: (req, res) => { },
    // Deleta usuário
    // Não retorna página
    delete: (req, res) => { },
    // O método acima pode ser chamado de destroy
    // destroy: (req, res)=>{},
};
module.exports = usersController;