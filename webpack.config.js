const path = require("path");

module.exports = {
  entry: "./src/webcomp/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./dist/",
    filename: "mui-webcomp.js",
    library: "muicss-webcomp",
    libraryTarget: "umd"
  },
  externals: {
    skatejs: {
      commonjs: "skatejs",
      commonjs2: "skatejs",
      amd: "skatejs"
    },
    preact: {
      commonjs: "preact",
      commonjs2: "preact",
      amd: "preact"
    },
    "@skatejs/renderer-preact": {
      commonjs: "@skatejs/renderer-preact",
      commonjs2: "@skatejs/renderer-preact",
      amd: "@skatejs/renderer-preact"
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "to-string-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};
