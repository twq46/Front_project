//createRouter创建路由实例
//createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Layout,
      children:[
        {
          //这里路径置空是因为home是默认进入的界面，就是当访问/这个路径的时候，默认进入home这个界面
          path:'',
          component:Home
        },
        {
          path:'category',
          component:Category
        },

      ]
    },
    {
      path:'/login',
      component:Login
    },

  ]
})

export default router
