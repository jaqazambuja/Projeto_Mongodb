const express = require('express')
const app = express ()
const mongoose = require('mongoose')
const cors = require('cors');

app.use(express.json())
app.use(cors());

//models
require('./src/models/Pedido')
const Pedido = mongoose.model('pedidos')

//conexao db
require('./src/db/connect')

app.get('/pedidos', async(req,res) => {
    const pedidosResponse = await Pedido.find()
    const pedidosJson = await pedidosResponse

    return res.json(pedidosJson)
});

app.post('/pedidos', async(req,res) =>{
    const novoPedido = new Pedido({
        nome: req.body.nome,
        cidade: req.body.cidade,
        produto: req.body.produto,
        quantidade: req.body.quantidade
    })
    novoPedido.save()

    res.json({message: "Pedido Concluido com sucesso", pedido: novoPedido})
});

app.put('/pedidos/:id', async(req,res) => {
    const { id } = req.params
    //pesquisa por um unico usuario
    const pedido = await Pedido.findOne({_id: id})

    //alterando os dados existentes
    pedido.nome = req.body.nome
    pedido.cidade = req.body.cidade
    pedido.produto = req.body.produto
    pedido.quantidade = req.body.quantidade


    //salvando alteração
    pedido.save()

    res.json({message: "Pedido Alterado"})
})

app.listen(3336)