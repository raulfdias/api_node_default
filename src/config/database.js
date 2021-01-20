const path = require('path');

require('dotenv').config({ path: path.resolve('src', '.env') });

const connections = {
    "dev": {
        "dialect": 'mysql',
        "host": process.env.DB_HOST || '127.0.0.1',
        "port": process.env.DB_PORT || 3306,
        "database": process.env.DB_DATABASE || 'db_app_node',
        "username": process.env.DB_USERNAME || 'root',
        "password": process.env.DB_PASSWORD || '',
        "operatorAliases": false,
        "define": {
            "timestamps": true,
            "underscored": true,
            "underscoredAll": true
        }
    },
    "hml": {
        "dialect": 'mysql',
        "host": process.env.DB_HOST || '127.0.0.1',
        "port": process.env.DB_PORT || 3306,
        "database": process.env.DB_DATABASE || 'db_app_node',
        "username": process.env.DB_USERNAME || 'root',
        "password": process.env.DB_PASSWORD || '',
        "operatorAliases": false,
        "define": {
            "timestamps": true,
            "underscored": true,
            "underscoredAll": true
        }
    },
    "prd": {
        "dialect": 'mysql',
        "host": process.env.DB_HOST || '127.0.0.1',
        "port": process.env.DB_PORT || 3306,
        "database": process.env.DB_DATABASE || 'db_app_node',
        "username": process.env.DB_USERNAME || 'root',
        "password": process.env.DB_PASSWORD || '',
        "operatorAliases": false,
        "define": {
            "timestamps": true,
            "underscored": true,
            "underscoredAll": true
        }
    }
};

const dbConnection = process.env.DB_CONNECTION || 'prd';

module.exports = connections[dbConnection];
