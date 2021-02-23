const jwt = require('jsonwebtoken'),
    path = require('path');

const { security } = require(path.resolve('src', 'config', 'app'));

const APIException = require('../exceptions/APIException');

module.exports = (req, res, next) => {
    let httpStatus = 401;
    let message = null;

    try {
        const { authorization } = req.headers ?? undefined;
        if (authorization === undefined) {
            throw new APIException('Token de acesso não identificado', httpStatus);
        }

        const [, token] = authorization.split(' ');
        const decoded = tokenValidate(token);
        if ((Object.keys(decoded).length === 0)) {
            throw new APIException('Token de acesso inválido', httpStatus);
        }

        httpStatus = 200;

        return next();
    } catch (err) {
        console.error(err);
        httpStatus = err.status ?? 500;
        message = err.message;
    }

    return res.status(httpStatus).json({ httpStatus, message });
};

function tokenValidate(token) {
    let decoded = {};

    try {
        decoded = jwt.verify(token, security.token, { algorithms: [security.algorithm] });
    } catch (err) {
        console.error(err);
        decoded = {};
    }

    return decoded;
}
