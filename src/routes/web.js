const express = require('express'),
    routes = express.Router();

// =======================CONTROLLERS =======================

const HomeController = require('../app/controllers/HomeController');

// =======================FIM CONTROLLERS =======================

/**
 * @swagger
 * tags: [
 *  { name: Web, description: Rota de apresentação da API },
 * ]
 *
 */

// =============================================================================ROUTES =============================================================================

/**
 * @swagger
 * /:
 *     get:
 *         summary: Rota de home da API
 *         tags: [Web]
 */
routes.get('/', HomeController.index);
// routes.get('/', (req, res) => res.render('welcome'));

// =============================================================================FIM ROUTES =============================================================================

module.exports = routes;
