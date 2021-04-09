const express = require('express'),
    routes = express.Router();

// =======================CONTROLLERS =======================

const HomeController = require('../app/controllers/HomeController');

// =======================FIM CONTROLLERS =======================

// =============================================================================ROUTES =============================================================================

routes.get('/', HomeController.index);
// routes.get('/', (req, res) => res.render('welcome'));

// =============================================================================FIM ROUTES =============================================================================

module.exports = routes;
