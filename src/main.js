// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'//vuex
import MuseUI from 'muse-ui'//muse-ui
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import axios from 'axios'//滑动组件
import '@/assets/scss/index.scss'//scss
import animate from 'animate.css'//css3动画
import VueLazyLoad from 'vue-lazyload'//图片懒加载



Vue.config.productionTip = false
Vue.use(MuseUI)
Vue.use(VueLazyLoad,{
  error:'../../../assets/img/album.jpg',//加载错误时的显示图片
  loading:'../../../assets/img/album.jpg'//加载过程中的过渡图片
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
