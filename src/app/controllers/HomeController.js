'use strict';

class HomeController {
    /**
     * Função responsável por carregar a index
     *
     * @param {*} req
     * @param {*} res
     * @returns view
     */
    async index(req, res) {
        return res.render('welcome');
    }
}

module.exports = new HomeController();
