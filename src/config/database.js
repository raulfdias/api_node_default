const path = require('path');
require('dotenv').config({ path: path.resolve('src', '.env') });

const connections = {
    dev: {
        dialect: 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'db_app_node_dev',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '123456',
        operatorAliases: false,
        timezone: '-03:00',
        logging: ((process.env.DB_LOG == 'true') ? console.log : false),
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
            underscored: true,
            underscoredAll: true
        }
    },
    tst: {
        dialect: 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_DATABASE || 'db_app_node_test',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '123456',
        operatorAliases: false,
        timezone: '-03:00',
        logging: ((process.env.DB_LOG == 'true') ? console.log : false),
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
        database: process.env.DB_DATABASE || 'db_app_node_hml',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '123456',
        operatorAliases: false,
        timezone: '-03:00',
        logging: ((process.env.DB_LOG == 'true') ? console.log : false),
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
        password: process.env.DB_PASSWORD || '123456',
        operatorAliases: false,
        timezone: '-03:00',
        logging: ((process.env.DB_LOG == 'true') ? console.log : false),
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
