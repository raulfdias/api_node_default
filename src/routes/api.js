const express = require('express'),
    routes = express.Router();

// Controllers
const StudentAPIController = require('../app/controllers/API/StudentAPIController');

// Middleware
const StudentValidator = require('../app/middleware/RequestValidation/Student');

// Routes
routes.get('/api/v1/student/list', StudentAPIController.list);
routes.post('/api/v1/student/create', StudentValidator.validate('OnCreate'), StudentAPIController.store);
routes.put('/api/v1/student/:id/update', StudentValidator.validate('OnUpdate'), StudentAPIController.update);
routes.delete('/api/v1/student/:id/delete', StudentAPIController.delete);
routes.get('/api/v1/student/search', StudentAPIController.search);
routes.get('/api/v1/student/:id/show', StudentAPIController.show);

module.exports = routes;
