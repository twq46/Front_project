import Vue from 'vue'
import Router from 'vue-router'
import user from "../views/home/aside/children/users/User";

// import Login from "@/views/login/Login";
const home = ()=> import("views/home/Home")
const login = ()=> import('views/login/Login')

const welcome = ()=> import('views/home/main/children/welcome')
const users = ()=> import('views/home/aside/children/users/User')
const roles = ()=> import('views/home/aside/children/right/Roles')
const rights = ()=> import('views/home/aside/children/right/Right')
const goods = ()=> import('views/home/aside/children/goods/GoodsList')
const params = ()=> import('views/home/aside/children/goods/CategoryParamas')
const categories = ()=> import('views/home/aside/children/goods/GoodsCategory')
const orders = ()=> import('views/home/aside/children/order/OrderList')
const reports = ()=> import('views/home/aside/children/data/DataReport')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'',
      redirect:'/login',
    },
    {
      path:'/login',
      component:login,
    },
    {
      path:'/home',
      component:home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:welcome,
        },
        {
          path:'/users',
          component:users
        },
        {
          path:'/roles',
          component:roles
        },
        {
          path:'/rights',
          component:rights
        },
        {
          path:'/goods',
          component:goods
        },
        {
          path:'/params',
          component:params
        },
        {
          path:'/categories',
          component:categories
        },
        {
          path:'/orders',
          component:orders
        },
        {
          path:'/reports',
          component:reports
        },
      ]
    },
  ],
  //这里可以让路径不再以哈希的方式显示，而是正常的显示路径
  mode:"history",
})

//挂载陆游导航守卫
// 为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next是一个函数，表示放行
  //    next()放行   next('/login')强制跳转


  if(to.path === '/login') return next()//如果当前路径是登录界面路径直接放行即可
  //获取token
  const tokenstr = window.sessionStorage.getItem('token')
  if(!tokenstr) return next('/login')//如果用户还处于未登录的状态，则强制跳转到登录界面
  next()//用户处于登录状态，直接放行
})
export default router
