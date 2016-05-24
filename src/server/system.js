import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import {join} from 'path'
import {log} from 'util'
import webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'

import webpackConfig from '../constants/webpack.config'
import index from './routes/index'

const app = express()
const compiler = webpack(webpackConfig)

app.use(cookieParser())
app.use(session({
	secret: 's3kr3t',
	resave: false,
	saveUninitialized:  false,
	cookie: {maxAge: 600000000}
}))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(WebpackDevMiddleware(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath
}))
app.use(WebpackHotMiddleware(compiler))
app.use(express.static(join(__dirname,'public')))

app.set('views',join(__dirname,'views'))
app.set('view engine','ejs')

app.use('/',index)

const startServer = ({port}) => {
	app.listen(port, err => {
		if(err){log(`Err encountered starting application server:${err}`)}
		log(`App running on port:${port}`)
	})
}

module.exports = startServer