// Importa o express e atribui a variável
const express = require('express');

// Inicializando o express
const app = express();

// Porta que irá rodar o Servidor
const port = 3000;

// Atribui conteúdo do Route a variável
const productRoute = require('./src/routes/productRoute');
const indexRoute = require('./src/routes/indexRoute');
const usersRoute = require('./src/routes/usersRoute');

// Configuração para acessar externamente conteúdo de uma pasta
app.use(express.static(__dirname + "/public"));

// Altera confugiração inicial do express para do template engine para ejs
app.set('view engine', 'ejs');

// ALtera configuração inicial do express do caminho do views para o nosso caminho de arquivos
app.set('views', __dirname + '/src/views');

// Converte o "body" da requisição para json (objeto)
app.use(express.json());

app.use('/product', productRoute);
app.use('/', indexRoute);
app.use('/users', usersRoute);

// Roda o express na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});