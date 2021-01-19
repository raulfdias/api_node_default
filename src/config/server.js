const express = require('express'),
	nunjucks = require('nunjucks'),
	path = require('path')

class Server {
	constructor() {
		this.express = express()
		this.isDev = process.env.NODE_ENV !== 'production'

		this.middlewares()
		this.views()
		this.routes()
	}

	middlewares() {
		this.express.use(express.json())
		this.express.use(express.urlencoded({ extended: false }))
	}

	views() {
		nunjucks.configure(path.resolve('app', 'Views'), {
			watch: this.isDev,
			express: this.express,
			autoescape: true
		})

		this.express.set('views engine', 'njk')
	}

	routes() {
		this.express.use(require('../app/routes/api'))
	}
}

module.exports = new Server().express
