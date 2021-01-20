const express = require('express'),
    nunjucks = require('nunjucks'),
    path = require('path')

require('dotenv').config({ path: path.resolve('src', '.env') })

class Server {
    constructor() {
        this.express = express()
        this.isDev = process.env.APP_ENVIROMENT !== 'production'

        this.middlewares()
        this.views()
        this.routes()
    }

    middlewares() {
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }))
    }

    views() {
        nunjucks.configure(path.resolve('src', 'app', 'views'), {
            watch: this.isDev,
            express: this.express,
            autoescape: true
        })

        this.express.use(express.static(path.resolve('src', 'public')))
        this.express.set('view engine', 'njk')
    }

    routes() {
        this.express.use(require('../routes/web'))
        this.express.use(require('../routes/api'))
    }
}

module.exports = new Server().express
