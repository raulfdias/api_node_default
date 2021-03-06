'use strict';

const jwt = require('jsonwebtoken'),
    path = require('path');

const { security } = require(path.resolve('src', 'config', 'app'));

const APIException = require('../../exceptions/APIException');

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
        let { token_expiration: expiration } = security;
        expiration = parseInt(expiration);

        try {
            const [, hash] = req.headers.authorization.split(' ');
            const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

            const user = await UserRepository.findFirst({ where: { usu_ds_email: email } });
            if (user === null) {
                throw new APIException('E-mail de usuário inválido', 400);
            }

            if (!(await UserRepository.checkPassword(password, user.usu_ds_password))) {
                throw new APIException('Credenciais inválidas', 401);
            }

            const payload = { user: user.usu_id_user, email: user.usu_ds_email };
            token = jwt.sign(payload, security.token, { algorithm: security.algorithm, expiresIn: expiration });
        } catch (err) {
            console.error(err);
            httpStatus = err.status ?? 500;
            message = err.message;

            expiration = null;
            token = null;
        }

        return res.status(httpStatus).json({ token, expiration, message, bagError });
    }
}

module.exports = new AuthAPIController();
