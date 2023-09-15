export default{
  namespaced:true,
  state:()=>({
    //收货地址
    address:JSON.parse(uni.getStorageSync('address') || '{}'),
    token:uni.getStorageSync('token') || '',
    //用户信息对象
    userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    //重定向的 object 对象 { openType, from }
    redirectInfo:null
  }),
  mutations:{
    //更新收货地址
    updateAddress(state,address){
      state.address = address
      this.commit('m_user/saveStorge')
    },
    saveStorge(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    saveUserinfoStorge(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
    updateUserinfo(state,userinfo){
      state.userinfo = userinfo
      this.commit('m_user/saveUserinfoStorge')
    },
    updateToken(state,token){
      state.token = token
      this.commit('m_user/saveTokenStorge')
    },
    saveTokenStorge(state){
      uni.setStorageSync('token',state.token)
    },
    updateRedirectInfo(state,info){
      state.redirectInfo = info
    },
  },
  getters:{
    addstr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    },
  }
}