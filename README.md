A fork of MUICSS [https://www.muicss.com], web service implementation using the SkateJS web components library

[![MUI](https://www.muicss.com/static/favicons/icon-192x192.png)](https://www.muicss.com)

MUI is a lightweight CSS framework that follows Google's Material Design guidelines.

Currently library works only on browsers with enabled Shadow DOM v1 (Chrome and Safari, soon coming to Firefox).

All the implemented components with the examples can be found on [test.html](https://htmlpreview.github.io/?https://github.com/dusanmiloradovic/mui/blob/master/test-web.html) page of this repo.

You need to put the shim and the polyfill from [webcompcomponets repository](https://github.com/webcomponents/webcomponentsjs) at the beginning of the page, do not bundle them with your main application script:

```shell
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```

**Install with NPM and Webpack:**

```shell
$ npm install --save muicss-webcomp
```

When you install the library with NPM, it has the roboto-fontface package as a peer dependency. To correctly load the fonts, you have to enable style loader in your webpack configuration, for example:
```
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
```
You can find full sample project in the example directory

**Use from unpkg:**
```shell
<script src="https://unpkg.com/muicss-webcomp"></script>
```

Components are not yet defined when you load the script, so you can choose which  to load from the library, if you don't need all of them. To load all the componets, call the following library function:

```shell
importAllComponents()
```
