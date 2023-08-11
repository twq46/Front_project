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

//根据用户id获取要修改用户原来的数据
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

//用户列表界面分配角色，获取所有的角色列表
export function getRloesListInfo(){
  return request({
    url:'/roles',
    method:'get'
  })
}

//分配用户角色
export function confirmAllotRoleInfo(userId,rid){
  return request({
    url:`/users/${userId}/role`,
    method:'put',
    data:{
      rid:rid,
    }
  })
}
