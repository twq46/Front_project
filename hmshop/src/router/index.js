import Vue from 'vue'
import Router from 'vue-router'

// import Login from "@/views/login/Login";
const home = ()=> import("views/home/Home")
const login = ()=> import('views/login/Login')
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
