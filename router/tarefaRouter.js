const express = require("express");
const db = require('../db.js');

const tarefaRouter = express.Router();
module.exports = tarefaRouter;

tarefaRouter.get('/tarefas', (req, res) => {
    res.status(200).json({ mensagem: "Entrou na rota tarefas" });
})
tarefaRouter.post('/tarefas', async (req, res) => {
    const { descricao, completa, usuario_id } = req.body;
    if (!descricao) {
        res.status(400).json({ mensagem: "descriçao é obrigatória!" });
    }
    try {
        await db('tarefas').insert({ descricao, completa, usuario_id });
        res.status(200).json({ mensagem: "Tarefa criada com sucesso!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: "Erro ao criar tarefa" });
    }
})

tarefaRouter.patch('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, completa, usuario_id } = req.body;

    if (!descricao) {
        res.status(400).json({ mensagem: "Descrição é obrigatória!" })
    }
    try {
        const result = await db('tarefas').where({ id }).update({ descricao, completa, usuario_id })
        if (result) {
            res.status(200).json({ mensagem: "Tarefa atualizada com sucesso!" })
        } else {
            res.status(404).json({ mensagem: "Tarefa não encontrada!" })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: "Erro ao atualizar tarefa!" })
    }
})

tarefaRouter.delete('/tarefas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db('tarefas').where({ id }).del();
        if (result) {
            res.status(200).json({ mensagem: "Tarefa deletada com sucesso!" })
        } else {
            res.status(404).json({ mensagem: "Tarefa não encontrada!" })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: "Erro ao deletar tarefa!" })
    }
})





