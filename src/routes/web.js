const express = require('express'),
    routes = express.Router();


routes.get('/', (req, res) => res.render('welcome'));

module.exports = routes;
