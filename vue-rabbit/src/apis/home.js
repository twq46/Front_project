import request from '@/utils/http'
export function getBannerListInfo(){
  return request({
    url:'/home/banner',
    method:'get'
  })
}
