const express = require('express');
const tarefaRouter = require('./router/tarefaRouter.js');
const usuarioRouter = require('./router/usuarioRouter.js');
const bodyParser = require('body-parser');
require('dotenv');


const app = express();
const PORT = 3000;
module.exports = app;
app.use(express.json());

app.use(tarefaRouter);
app.use(usuarioRouter)

app.get('/', (req, res) => {
    res.status(200).send('Ta funcionando')
})

app.listen(PORT, (req, res) => {
    console.log(`Server rodando na porta ${PORT}`);
})