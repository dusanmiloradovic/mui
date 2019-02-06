A fork of MUICSS [https://www.muicss.com], web service implementation using the SkateJS web components library

[![MUI](https://www.muicss.com/static/favicons/icon-192x192.png)](https://www.muicss.com)

MUI is a lightweight CSS framework that follows Google's Material Design guidelines.

Currently library works only on browsers with enabled Shadow DOM v1 (Chrome and Safari, soon coming to Firefox).

All the implemented components with the examples can be found on [test.html](https://unpkg.com/muicss-webcomp/test-web.html) page of this repo.

You need to put the shim and the polyfill from [webcompcomponets repository](https://github.com/webcomponents/webcomponentsjs) at the beginning of the page, do not bundle them with your main application script:

```shell
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```

**Install with NPM and Webpack:**

```shell
$ npm install --save muicss-webcomp
```

This package doesn't include the roboto fonts, you have to install them separately


**Use from unpkg:**
```shell
<script src="https://unpkg.com/muicss-webcomp"></script>
```


Components are not yet defined when you load the script, so you can choose which  to load from the library, if you don't need all of them. To load all the componets, call the following library function:

```shell
importAllComponents()
```
