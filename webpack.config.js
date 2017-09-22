const path = require('path');

module.exports = {
    entry: './src/webcomp/index.js',
    output: {
	path: path.resolve(__dirname, "dist"), 
	filename: 'mui-webcomp.js',
	library:'muicss-webcomp',
	libraryTarget:'umd'
    },
    externals:{
	skatejs:{
	    commonjs:'skatejs',
	    commonjs2:'skatejs',
	    amd:'skatejs'
	},
	roboto_fontface:{
	    commonjs:'roboto-fontface',
	    commonjs2:'roboto-fontface',
	    amd:'roboto-fontface'
	}
    },
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

