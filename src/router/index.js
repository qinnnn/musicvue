import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/home/HelloWorld'
import count from '@/components/count/count'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/count",
      name:"count",
      component:count,
      children:[
        {
          path:"phone",
          component:phone
        }
      ]
    }
  ]
})
