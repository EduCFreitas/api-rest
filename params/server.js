const express = require('express');

const app = express();

app.get('/users', (req, res) =>{
    const {nome} = req.query; // http://localhost:3000/users?nome=Eduardo
    res.json({nome: `${nome}`});
});

app.get('/contato/:id', (req, res) =>{
    const {id} = req.params; // http://localhost:3000/contato/10
    res.json({id: `${id}`});
});

app.listen(3000);

// Query Params = ?name=Eduardo
// Route Params = http://localhost:3000/users/1
// Request body = {"id": 1}