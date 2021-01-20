const express = require('express'),
    routes = express.Router();

// Controllers
const AlunoAPIController = require('../app/controllers/API/AlunoAPIController');

// Middleware
const AlunoValidator = require('../app/middleware/RequestValidation/Aluno');

// Routes
routes.get('/api/v1/aluno/list', AlunoAPIController.list);
routes.post('/api/v1/aluno/create', AlunoValidator.validate('OnCreate'), (req, res) => {
    return AlunoAPIController.store(req, res);
});

module.exports = routes;
