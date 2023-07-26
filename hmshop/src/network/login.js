import {request} from "./request";

export function LoginForm(loginForm){
  return request({
    url:'/login',
    method:'post',
    params:loginForm,
  })
}
