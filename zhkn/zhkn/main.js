import App from './App'
//导入网络请求的包
import{$http} from '@escook/request-miniprogram'
uni.$http = $http
//请求的根路径
$http.baseUrl = 'https://www.zytb.top/agent_gk_new'
// $http.baseUrl = 'https://www.zytb.top/NEMT/gk'
//请求拦截器
$http.beforeRequest = function(options){
  uni.showLoading({
    title:"数据加载中",
  }),
  options.header = {
    Authorization:store.state.m_user.token
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