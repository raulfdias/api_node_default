'use strict';

class HomeController {
    async index(req, res) {
        return res.render('welcome');
    }
}

module.exports = new HomeController();
