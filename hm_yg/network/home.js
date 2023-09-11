import {request} from './request.js'

export function getSwiperListInfo(){
  return request({
    url:'/api/public/v1/home/swiperdata',
    method:'get'
  })
}