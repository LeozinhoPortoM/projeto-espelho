const fs = require('fs');
const path = require("path");

const authController = {
  // Tela para cadastro do usuário
  register: (req, res) => {
    return res.render("register", {
      title: "Cadastro",
    });
  },
  // Processamento do cadastro do usuário
  create: (req, res) => {
    const usersJson = fs.readFileSync(
      // Caminho do arquivo
      path.join(__dirname, "..", "database", "users.json"),
      // Formato de leitura
      "utf-8"
    );
    const users = JSON.parse(usersJson);
    const { nome, sobrenome, apelido, email, senha, confirmar_senha } = req.body;
    // if (!errors.isEmpty()) {
    //   return res.render("register", { title: "Cadastrar usuário", errors: errors.mapped(), old: req.body });
    // }
    if (
      !nome ||
      !sobrenome ||
      !apelido ||
      !email ||
      !senha ||
      !confirmar_senha
    ) {
      return res.render("register", {
        title: "Cadastro",
        error: {
          message: "Preencha todos os campos",
        },
      });
    }
    if (senha !== confirmar_senha) {
      return res.render("register", {
        title: "Cadastro",
        error: {
          message: "Senhas não coincidem",
        },
      });
    }
    const newId = users[users.length - 1].id + 1;
    // Objeto com dados do novo usuário
    const newUser = {
      id: newId,
      nome,
      sobrenome,
      apelido,
      senha,
      email,
      admin: false,
      criadoEm: new Date(),
      modificadoEm: new Date(),
    };
    users.push(newUser);
    fs.writeFileSync(
      // Caminho e nome do arquivo que será criado/atualizado
      path.join(__dirname, "..", "database", "users.json"),
      // Conteúdo que será salvo no arquivo
      JSON.stringify(users)
    );
    res.redirect("/");
  },
  // Tela para realizar login
  login: (req, res) => {
    return res.render("user-login", {
      title: "Login",
    });
  },
  // Processamento do login
  auth: (req, res) => {
    const usersJson = fs.readFileSync(
      path.join(__dirname, "..", "database", "users.json"),
      "utf-8"
    );

    const users = JSON.parse(usersJson);

    const { email, senha } = req.body;
    const userAuth = users.find((user) => {
      if (user.email === email) {
        return true;
      }
    });

    if (!userAuth || userAuth.senha === senha) {
      return res.render("user-login", {
        title: "Login",
        error: {
          message: "Email ou senha inválido",
        },
      });
    }
    res.redirect("/");
  },
  // Processamento do deslogar
  logout: (req, res) => { },



  forgout: (req, res) => { },
  remember: (req, res) => { },
  reset: (req, res) => { },
};

module.exports = authController;