const path = require('path');

require('dotenv').config({ path: path.resolve('src', '.env') });

module.exports = {
    app: {
        name: process.env.APP_NAME || 'API Node Default',
        env: process.env.APP_ENVIROMENT !== 'production',
        url: process.env.APP_URL !== 'http://localhost:4000',
        timezone: 'America/Bahia'
    },
    security: {
        token: process.env.SECURITY_TOKEN || 'guiu237gukYGT76tmbHT87zsLIO65Gysdf8uysiuadhf78sdfbtu89elaou6g976i89TGv87oG697ftgfkJJHyuf&deE',
        token_expiration: process.env.SECURITY_TOKEN_EXPIRATION || 300,
        algorithm: 'HS256'
    }
};
