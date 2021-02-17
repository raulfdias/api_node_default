const path = require('path');

require('dotenv').config({
    path: (process.env.NODE_ENV === 'test') ? path.resolve('src', '.env.test') : path.resolve('src', '.env.test')
});

const connections = {
    dev: {
        dialect: 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'db_app_node',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        operatorAliases: false,
        timezone: '-03:00',
        logging: console.log,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
            underscored: true,
            underscoredAll: true
        }
    },
    hml: {
        dialect: 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'db_app_node',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        operatorAliases: console.log,
        timezone: '-03:00',
        logging: true,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
            underscored: true,
            underscoredAll: true
        }
    },
    prd: {
        dialect: 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'db_app_node',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        operatorAliases: false,
        timezone: '-03:00',
        logging: false,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
            underscored: true,
            underscoredAll: true
        }
    }
};

const dbConnection = process.env.DB_CONNECTION || 'prd';

module.exports = connections[dbConnection];
