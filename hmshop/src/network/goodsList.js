import {request} from "./request";

//获取商品列表
export function getGoodListInfo(query){
  return request({
    url:'/goods',
    method:'get',
    params:query
  })
}
//删除商品
export function deleteGoodsInfo(id){
  return request({
    url:`/goods/${id}`,
    method:'delete'
  })
}
//获取所有商品分类数据
export function getCatListInfo(){
  return request({
    url:'/categories',
    method:'get'
  })
}

//添加商品
export function addGoodsInfo(query){
  return request({
    url:'/goods',
    method:'post',
    data:query
  })
}

//编辑商品
export function editGoodsInfo(id,query){
  return request({
    url:`/goods/${id}`,
    method:'put',
    data:query
  })
}
