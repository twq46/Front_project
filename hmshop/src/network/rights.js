import {request} from "./request";
//请求所有权限列表
export function getRightsList(){
  return request({
    url:'/rights/list',
    method:'get'
  })
}
