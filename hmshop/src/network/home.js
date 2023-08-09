import {request} from "./request";

export function getMenusList(){
  return request({
    url:'/menus',
    method:'get'
  })
}
export function getUserList(queryInfo){
  return request({
    url:'/users',
    method:'get',
    params:queryInfo
  })
}

//修改用户请求
export function setUserInfo(userInfo){
  return request({
    url:`/users/${userInfo.id}/state/${userInfo.mg_state}`,
    method:'put'
  })
}

//添加用户的请求
export function addUserInfo(query){
  return request({
    url:'/users',
    method:'post',
    data:query,
  })
}

//编辑用户数据
export function editUserInfo(id){
  return request({
    url:`/users/${id}`,
    method:'get',
  })
}

//修改用户提交
export function commitEditUser(query){
  return request({
    url:`/users/${query.id}`,
    method:'put',
    data:{
      email:query.email,
      mobile:query.mobile
    }
  })
}

//删除用户的请求
export function deleteUserInfo(id){
  return request({
    url:`/users/${id}`,
    method:'delete'
  })
}
