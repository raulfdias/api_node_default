const APIException = require('../exceptions/APIException'),
    jwt = require('jsonwebtoken');

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
        decoded = jwt.verify(token, 'guiu237gukYGT76tkGF65Gyg976i89TGv87oG697ftgfkJJHyuf44');
    } catch (err) {
        console.error(err);
        decoded = {};
    }

    return decoded;
}
