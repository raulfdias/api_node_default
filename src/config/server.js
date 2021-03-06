'use strict';

const express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    cors = require('cors'),
    swaggerUI = require('swagger-ui-express'),
    swaggerJsDoc = require('swagger-jsdoc');

const { app, swagger } = require(path.resolve('src', 'config', 'app'));

class Server {
    constructor() {
        this.isDev = app.env !== 'production';
        this.express = express();

        this.middlewares();
        this.views();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(morgan('dev'));
        this.express.use(helmet());
        this.express.use(cors({
            'origin': [app.url],
            'methods': ['GET', 'PUT', 'POST', 'DELETE'],
            'allowHeaders': ['Content-Type', 'Authorization'],
            'optionsSuccessStatus': 200
        }));
    }

    views() {
        nunjucks.configure(path.resolve('src', 'app', 'views'), {
            watch: this.isDev,
            express: this.express,
            autoescape: true
        });

        this.express.use(express.static(path.resolve('src', 'public')));
        this.express.set('view engine', 'njk');
    }

    routes() {
        if (this.isDev) {
            const specs = swaggerJsDoc(swagger);

            this.express.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
        }

        this.express.use(require('../routes/web'));
        this.express.use(require('../routes/api'));
    }
}

module.exports = new Server().express;
