const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv')

if(process.env['NODE_ENV'] != 'production'){
	dotenv.config()
	process.env.PORT = 3000
	process.env['NODE_ENV'] = 'development'
	console.log('Dev environment')
}

const httpServer = express()
const baseServer = http.createServer(httpServer)

baseServer
	.listen(process.env.PORT, () => {
		console.log(`Running on ${process.env.PORT}`)
		console.log(Date().toLocaleString())
	})

httpServer
	.use(cookieParser())
	.use(bodyParser.json())
	.use('/', express.static('./public'))
	.use('/', express.static('./views'))
