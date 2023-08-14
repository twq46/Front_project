import {request} from "./request";

export function getGoodsCategory(query){
  return request({
    url:'/categories',
    method:'get',
    params:query
  })
}

//获取父级分类的列表
export  function getParentCatInfo(query){
  return request({
    url:'/categories',
    method:'get',
    params:query,
  })
}

//添加分类
export function addCatInfo(query){
  return request({
    url:'/categories',
    method:'post',
    data:query
  })
}

//编辑分类
export function editCatInfo(id,query){
  return request({
    url:`/categories/${id}`,
    method:'put',
    data:{
      cat_name:query
    }
  })
}

//删除分类
export function deleteCatInfo(query){
  return request({
    url:`/categories/${query}`,
    method:'delete',
  })
}



