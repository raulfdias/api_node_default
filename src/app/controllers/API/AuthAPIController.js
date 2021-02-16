'use strict';

const APIException = require('../../exceptions/APIException'),
    jwt = require('jsonwebtoken');

const Controller = require('../Controller');

const UserRepository = require('../../repositories/UserRepository');

class AuthAPIController extends Controller {
    /**
     * Função responsável por efetuar a geração do token de autenticação
     *
     * @param {*} req
     * @param {*} res
     */
    async generateToken(req, res) {
        let httpStatus = 200;
        const bagError = {};
        let message = null;

        let token = null;

        try {
            const [, hash] = req.headers.authorization.split(' ');
            const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

            const user = await UserRepository.findFirst({ where: { usu_ds_email: email } });
            if (user === null) {
                throw new APIException('Usuário não existe', 400);
            }

            if (!(await UserRepository.checkPassword(password, user.usu_ds_password))) {
                throw new APIException('Credenciais inválidas', 401);
            }

            token = jwt.sign({ user: user.usu_id_user }, 'guiu237gukYGT76tkGF65Gyg976i89TGv87oG697ftgfkJJHyuf', { expiresIn: 86400 });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            token = null;
        }

        return res.status(httpStatus).json({ token, httpStatus, message, bagError });
    }
}

module.exports = new AuthAPIController();
