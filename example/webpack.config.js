const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
	path: path.resolve(__dirname, "dist"),
	publicPath:"./dist/",
	filename: 'full.js'
    },
    module: {
	loaders: [
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader'
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
