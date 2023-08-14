import Vue from 'vue'
import App from './App'
import router from './router'
//导入全局样式
import './assets/css/global.css'

//全局引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//导入字体图标
import 'assets/fonts/iconfont.css'
Vue.config.productionTip = false

//导入树形插件
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table',TreeTable)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
