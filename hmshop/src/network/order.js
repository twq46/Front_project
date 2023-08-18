import {request} from "./request";

//获取订单列表数据
export function getOrderListInfo(query){
  return request({
    url:'/orders',
    method:'get',
    params:query
  })
}

//获取物流信息
export function getProgressInfo(){
  return request({
    url:`/kuaidi/804909574412544580`,
    method:'get'
  })
}
