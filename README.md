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


## 更新版本中发生的问题
1、webpack-dev-server最新版本问题
版本升级到最新版本会报 `Cannot assign to read only property 'exports' of object '#<Object>'` 错误
暂时解决办法：webpack-dev-server版本降级至3.5.1

2、url-loader最新版本问题
经由url-loader转换后，图片路径出现问题，输出：[object Module]，导致无法查看图片