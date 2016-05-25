import webpack from 'webpack'
import {join}  from 'path'
import {importPaths} from 'node-bourbon'

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		join(__dirname, '../app/index')
	],
	output: {
		filename: 'bundle.js',
		path: join(__dirname, '../server/public/dist/js'),
		publicPath: '/static/'
	},
	devTools: ['eval-source-maps'],
	plugins: [
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(), 
			new webpack.NoErrorsPlugin()],
	query: {
		"presets":["react-hmre"],
		"plugins":[
			["react-transform",{
				"transforms": [{
					"transform":"react-transform-hmr",
					"imports":["react"],
					"locals":["module"]
				}]
			}]
		]
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loaders: ['babel'],
				include: join(__dirname, '../app'),
				exclude: /(node_modules|libs)/
			},
			{
				test: /\.scss?$/,
				loader: `style!css!sass?includePaths[]=${importPaths}`
			}
		]
	}
}