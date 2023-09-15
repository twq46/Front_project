import App from './App'

//导入网络请求的包
import{$http} from '@escook/request-miniprogram'
uni.$http = $http
//请求的根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
//请求拦截器
$http.beforeRequest = function(options){
  uni.showLoading({
    title:"数据加载中",
    
  })
  // console.log(store)
  // console.log(options)
  //判断当前请求是否为有权限的接口
  if(options.url.indexOf('/my/')!== -1){
    options.header = {
      Authorization:store.state.m_user.token
    }
  }
}
//响应拦截器
$http.afterRequest = function(){
  uni.hideLoading()
}

//封装弹窗的方法
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none',
  })
}
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
// 1. 导入 store 的实例对象
import store from './store/store.js'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif