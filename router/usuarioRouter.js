const express = require('express');
const usuarioRouter = express.Router();
const db = require('../db.js')


module.exports = usuarioRouter;

usuarioRouter.get('/usuario', (req, res) => {
    res.status(200).json({ mensagem: 'Rota de usuario' })
})

usuarioRouter.post('/usuario', async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e email são obrigatórios!' });
    }

    try {
        await db('usuarios').insert({ nome, email });
        res.status(201).json({ message: 'Usuário inserido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir usuário' });
    }

})

usuarioRouter.patch('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ message: 'nome e email são obrigatórios!' });
    }
    try {
        const result = await db('usuarios').where({ id }).update({ nome, email });
        if (result) {
            return res.status(200).json({ message: 'usuário atualizado com sucesso!' })
        } else {
            return res.status(404).json({ message: 'usuário não encontrado!' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
})

usuarioRouter.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db('usuarios').where({ id }).del();
        if (result) {
            res.status(200).json({ mensagem: "Usuario deletado com sucesso!" })
        } else {
            res.status(404).json({ mensage: "Usuario nao encontrado!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: "Erro ao deletar usuario" });
    }
})
