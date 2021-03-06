const path = require('path');

require('dotenv').config({ path: path.resolve('src', '.env') });

module.exports = {
    app: {
        server_port: process.env.APP_SERVER_PORT || 4000,
        name: process.env.APP_NAME || 'API Node Default',
        env: process.env.APP_ENVIROMENT !== 'production',
        url: process.env.APP_URL || `http://localhost:4000`,
        timezone: 'America/Bahia'
    },
    security: {
        token: process.env.SECURITY_TOKEN || 'guiu237gukYGT76tmbHT87zsLIO65Gv8ad-fsAd4ia8d7dsG0,d4dsfaDSasoyufyOIyuI809OYogIGYGkicv90g78UBo7g9UUHhkggiuhYUtgfkJJHyuf&deE',
        token_expiration: process.env.SECURITY_TOKEN_EXPIRATION || 300,
        algorithm: 'HS256'
    },
    swagger: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: process.env.APP_NAME || 'API Node Default',
                version: '1.0.0',
                description: 'Documentation automatically generated by the <b>swagger</b>.',
                contact: {
                    name: 'Raul Fernandes Dias'
                }
            },
            servers: [
                {
                    url: process.env.APP_URL || `http://localhost:4000`
                }
            ]
        },
        apis: [
            path.resolve('src', 'routes', '*.js')
        ]
    }
};
