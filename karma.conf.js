var webpack = require('webpack');
var path = require('path');

module.exports = function (config){
	config.set({
		browsers: ['Chrome'],
		singleRun: true,
		frameworks: ['mocha'],
		files: ['tests.webpack.js'],
		plugins: [
	      'karma-chrome-launcher',
	      'karma-chai',
	      'karma-mocha',
	      'karma-sourcemap-loader',
	      'karma-webpack',
	    ],
		preprocessors: { 'tests.webpack.js': ['webpack','sourcemap'] },
		reporters: ['dots'],
		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{
						test: /\.js?$/,
						loaders: ['babel'],
						include: path.join(__dirname, 'src/app'),
						exclude: /(node_modules|libs)/
					}
				]
			}
		},
		webpackServer: {
			noInfo: true
		}
	})
}