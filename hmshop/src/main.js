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

//利用中央总线的方式传值
Vue.prototype.$bus = new Vue()

//导入树形插件
import TreeTable from 'vue-table-with-tree-grid'
Vue.component('tree-table',TreeTable)

//导入富文本编辑器
import QuillEditor from 'vue-quill-editor'
//require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(QuillEditor)

//定义全局的时间过滤器（毫秒 -> 日期时间）
// dateFormat：过滤器名字，
Vue.filter('dateFormat',function (orginVal){
  const dt = new Date(orginVal)
  const y = dt.getFullYear()
  //getMonth得到的月份是从零开始的，转化为字符串之后当月份不足两位，使用padStart在前面补零
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + '').padStart(2,'0')
  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
