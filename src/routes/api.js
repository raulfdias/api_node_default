const express = require('express'),
    routes = express.Router(),
    path = require('path')


const AlunoAPIController = require('../app/controllers/API/AlunoAPIController')



routes.get('/api/v1/aluno/list', AlunoAPIController.list)
routes.post('/api/v1/aluno/create', AlunoAPIController.store)



module.exports = routes
