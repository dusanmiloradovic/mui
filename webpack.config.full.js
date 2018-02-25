const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool:'source-map',
    entry: './src/webcomp/index.js',
    output: {
	path: path.resolve(__dirname, "distfull"),
	publicPath:"./distfull/",
	filename: 'mui-webcomp-full.js'
    },
    module: {
	loaders: [
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader'
	    },
	    {
		test: /\.scss$/,
		use:[
		    {loader:'to-string-loader'},
		    {loader:'css-loader'},
		    {loader:'sass-loader'}
		]
	    },
	    {
		test:/\.css$/,
		use:[
		    {loader:'style-loader'},
		    {loader:'css-loader'}
		    ]
	    },
	    {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader", query: {
		outputPath: 'static/images/'
	    }},
	    {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader", query: {
		outputPath: 'static/images/'
	    }}
	]
    }
};

