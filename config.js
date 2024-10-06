const database = require('./knexfile.js');


const dados = {
    nome: "Guilherme Andrade"
}

database.insert(dados).into("usuarios").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

