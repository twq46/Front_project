import axios from "axios";
export function request(config){
  const instance = axios.create({
    //1.创建axios实例
    baseURL:'http://127.0.0.1:8888/api/private/v1/',
    timeout:5000,
  })
  //2.axios的拦截器
  instance.interceptors.request.use(config =>{
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
