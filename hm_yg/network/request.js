import axios from "axios"
//导入NProgress包对应的JS和CSS
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
export function request(config){
  const instance = axios.create({
    //1.创建axios实例
    baseURL:'https://api-hmugo-web.itheima.net',
    timeout:5000,
  })
  //2.axios的拦截器
  instance.interceptors.request.use(config =>{
    //在request拦截器中展示进度条
    // NProgress.start()
    //为请求头对象，添加验证的Authorization字段
    //后面接口的请求，都必须是在登录之后的情况下才能请求
    // config.headers.Authorization = window.sessionStorage.getItem('token')//拿到登录之后服务器返回的token的
    return config
  },error => {
    console.log(error);
  })
  //3.响应拦截
  instance.interceptors.response.use(res =>{
    //在response拦截器中隐藏进度条
    // NProgress.done()
    return res.data
  },error => {
    console.log(error);
  })
  //4.发送真正的网络请求
  return instance(config)
}
