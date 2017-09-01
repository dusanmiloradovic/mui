const path = require('path');

module.exports = {
  entry: './src/webcomp/index.js',
  output: {
    path: path.resolve(__dirname, "dist"), 
    filename: 'bundle.js'
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
        use:[{loader:'to-string-loader'},{loader:'css-loader'},{loader:'sass-loader'}]
      }
    ]
  }
}

