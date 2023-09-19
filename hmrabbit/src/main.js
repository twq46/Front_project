import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//1.导入createPinia
import {createPinia} from 'pinia'

//2.执行方法得到的实例
const pinia = createPinia()

//3.把pinia实例加入到app应用中
createApp(App).use(pinia).use(router).mount('#app')
