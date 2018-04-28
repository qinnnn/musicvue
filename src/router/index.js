import Vue from 'vue'
import Router from 'vue-router'
import app from '@/App'
import login from '@/components/login/login'
import index from '@/components/index/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/',
      redirect:'/app'
    }
  ]
})
