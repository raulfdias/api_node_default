const express = require('express'),
    routes = express.Router();

// Controllers
const StudentAPIController = require('../app/controllers/API/StudentAPIController');

// Middleware
const StudentValidator = require('../app/middleware/RequestValidation/Student');

// Routes
routes.get('/api/v1/student/list', StudentAPIController.list);
routes.post('/api/v1/student/create', StudentValidator.validate('OnCreate'), StudentAPIController.store);

module.exports = routes;
