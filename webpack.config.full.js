const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool:'source-map',
    entry: './src/webcomp/index.js',
    output: {
	path: path.resolve(__dirname, "distfull"), 
	filename: 'mui-webcomp-full.js'
    },
    plugins: [
	new UglifyJsPlugin({sourceMap:true})
    ],
    module: {
	loaders: [
	    {
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader'
	    },
	    {
		test: /\.css$/,
		use: [
		    'to-string-loader',
		    'css-loader'
		]
	    },
	    {
		test: /\.scss$/,
		use:[
		    {loader:'to-string-loader'},
		    {loader:'css-loader'},
		    {loader:'sass-loader'}
		]
	    },
	    {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
	    {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
	]
    }
};

