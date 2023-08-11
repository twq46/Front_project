import {request} from "./request";
export function getRolesListInfo(){
  return request({
    url:'/roles',
    method:'get'
  })
}

//添加角色
export function addRoleInfo(query){
  return request({
    url:'/roles',
    method:'post',
    data:query
  })
}

//删除角色
export function deleteRoleInfo(roleId){
  return request({
    url:`/roles/${roleId}`,
    method:'delete',
  })
}

//获取要编辑的角色的数据
export function getEditRoleInfo(roleId){
  return request({
    url:`/roles/${roleId}`,
    method:'get',
  })
}

//提交修改后的角色信息
export function saveEditRoleInfo(query){
  return request({
    url:`/roles/${query.roleId}`,
    method:'put',
    data:{
      roleName:query.roleName,
      roleDesc:query.roleDesc,
    }
  })
}

//删除角色制定权限
export function deleteRoleRightInfo(roleId,rightId){
  return request({
    url:`/roles/${roleId}/rights/${rightId}`,
    method:'delete'
  })
}

//获取权限列表
export function getRightListInfo(){
  return request({
    url:'/rights/tree',
    method:'get'
  })
}

//为指定用户分配权限
export function allotRightInfo(roleId,query){
  return request({
    url:`/roles/${roleId}/rights`,
    method:'post',
    data: {rids:query}
  })
}
