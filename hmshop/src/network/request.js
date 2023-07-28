import axios from "axios";
export function request(config){
  const instance = axios.create({
    //1.创建axios实例
    baseURL:'http://127.0.0.1:8888/api/private/v1/',
    timeout:5000,
  })
  //2.axios的拦截器
  instance.interceptors.request.use(config =>{
    //为请求头对象，添加验证的Authorization字段
    //后面接口的请求，都必须是在登录之后的情况下才能请求
    config.headers.Authorization = window.sessionStorage.getItem('token')//拿到登录之后服务器返回的token的值
    return config
  },error => {
    console.log(error);
  })
  //3.响应拦截
  instance.interceptors.response.use(res =>{
    return res.data
  },error => {
    console.log(error);
  })
  //4.发送真正的网络请求
  return instance(config)
}
