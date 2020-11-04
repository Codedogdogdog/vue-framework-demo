# fmc

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目录结构
src
- assets      本地静态资源
- common      应用公共配置：例如导航信息，公共样式等
- components  通用组件：存放业务通用组件或者内部通用组件，以_前缀做区分
- utils       工具库

## 项目构建
项目拉下来后，需通过`git remote origin set-url [url]`来修改仓库地址

## 项目优化
### Tree shaking
之前一直因为tree-shaking会导致`.vue`文件里的样式丢失，而不敢引入。
现在找到解决办法

在 modeule -> rule 里明确style区域块存在副作用即可
```
oneOf: [
  {
    resourceQuery: /\?vue/,
    // 指定.vue文件的 style区域块 使用 tree shaking 时会有副作用
    sideEffects: true,
    use: loader
  }, {
    use: loader
  }
]
```

## 待更新问题
- postcss-px-to-viewport 使用了 postcss v7 的方法，该方法在postcss v8 不兼容导致错误
将 postcss 降版本到 7.0.32 并且将 postcss-loader 升级到最新版(为了减少控制台提示)
