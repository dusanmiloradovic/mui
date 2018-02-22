A fork of MUICSS [https://www.muicss.com], web service implementation using the SkateJS web components library

[![MUI](https://www.muicss.com/static/favicons/icon-192x192.png)](https://www.muicss.com)

MUI is a lightweight CSS framework that follows Google's Material Design guidelines.

Currently library works only on browsers with enabled Shadow DOM v1 (Chrome and Safari, soon coming to Firefox).

All the implemented components with the examples can be found on [test.html](https://htmlpreview.github.io/?https://github.com/dusanmiloradovic/mui/blob/master/test-web.html) page of this repo.

You need to put the shim and the polyfill from [webcompcomponets repository](https://github.com/webcomponents/webcomponentsjs) at the beginning of the page, do not bundle them:

```shell
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```

**Install with NPM:**

```shell
$ npm install --save muicss-webcomp
```

**Use from unpkg:**
```shell
<script src="https://unpkg.com/muicss-webcomp"></script>
```

Components are not yet defined when you load the script, so you can choose which  to load from the library, if you don't need all of them. To load all the componets, call the following library function:

```shell
importAllComponents()
```
