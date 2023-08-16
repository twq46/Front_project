import {request} from "./request";
export function getCateListInfo(){
  return request({
    url:'/categories',
    method:'get'
  })
}

//获取参数列表
export function getParamsListInfo(query){
  return request({
    url:`/categories/${query.id}/attributes`,
    method:'get',
    params:{
      sel:query.sel
    }
  })
}

//添加参数列表
export function confirmAddInfo(query){
  return request({
    url:`/categories/${query.id}/attributes`,
    method:'post',
    data:{
      attr_name:query.attr_name,
      attr_sel:query.attr_sel
    }
  })
}

//编辑参数
export function editParamsInfo(query){
  return request({
    url:`/categories/${query.id}/attributes/${query.attr_id}`,
    method:'put',
    data:{
      attr_name:query.attr_name,
      attr_sel:query.attr_sel
    }
  })
}

//删除参数
export function deleteParamsInfo(query){
  return request({
    url:`/categories/${query.id}/attributes/${query.attr_id}`,
    method:'delete',
  })
}

//编辑提交参数
export function commitEditParamsTagInfo(query){
  return request({
    url: `/categories/${query.id}/attributes/${query.attr_id}`,
    method:'put',
    data:{
      attr_name:query.attr_name,
      attr_sel:query.attr_sel,
      attr_vals:query.attr_vals
    }
  })
}
