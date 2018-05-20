# 网易云移动端播放器

> 这是一个模仿网易云手机端做的demo项目
功能：播放音乐，歌词，音乐列表，个人信息，发现音乐，mv，登录等
待完成：mv播放页面、歌单、mv和歌曲评论，搜索功能，电台等
网易云api：这里要感谢[@Binaryify](https://binaryify.github.io/NeteaseCloudMusicApi/#/)的网易云接口
使用的组件：vue-lazyload（图片懒加载），axios，better-scroll（滑动组件），muse-ui，router，vuex等
项目注意:启动项目前要先运行api，用的是默认端口3000，项目启动后有些音乐可能会无法加载，这是网易云端口禁止访问音乐文件的问题，具体解决方法未知，如有人知晓如何解决还望留言，谢谢

# 项目截图
<div>
<img width="40%" src="https://raw.githubusercontent.com/qinnnn/img-folder/master/readme1.png"/> 　　　
<img width="40%" src="https://github.com/qinnnn/img-folder/blob/master/readme1.png"/>
</div>
<br>
<div>
<img width="40%" src="http://upload-images.jianshu.io/upload_images/4928722-e05f250cf4bce6a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>　　　
<img width="40%" src="http://upload-images.jianshu.io/upload_images/4928722-a30cb8f31007b7ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"/>
</div>


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

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


