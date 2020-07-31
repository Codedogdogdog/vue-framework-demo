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

## 更新版本中发生的问题
1、webpack-dev-server最新版本问题 [fixed]
版本升级到最新版本会报 `Cannot assign to read only property 'exports' of object '#<Object>'` 错误
暂时解决办法：webpack-dev-server版本降级至3.5.1

2、url-loader最新版本问题 [fixed]
经由url-loader转换后，图片路径出现问题，输出：`[object Module]`，导致无法查看图片

## 待更新问题
1、没引入polyfill导致使用async出错
引入 @babel/polyfill ，并且在.babelrc文件配置 "useBuiltIns": "usage"

