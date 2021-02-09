const express = require('express'),
    routes = express.Router();

// Controllers
const HomeController = require('../app/controllers/HomeController');

// routes.get('/', (req, res) => res.render('welcome'));
routes.get('/', HomeController.index);

module.exports = routes;
