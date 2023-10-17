export default {
  namespaced:true,
  state:()=>({
    token:'',
    //用户信息兑现
    userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}')
  }),
  mutations:{
    //修改用户排名
    updateUserRank(state,rank){
      state.userinfo.rank = rank
      this.commit('m_user/saveUserRankToStorege')
    },
    //将修改后的用户排名信息保存到store中
    saveUserRankToStorege(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
    //修改用户分数
    updateUserScore(state,score){
      state.userinfo.score = score
      this.commit('m_user/saveUserScore')
    },
    //将修改后的分数持久化储存
    saveUserScore(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
    //更新token字符串
    updateToken(state,token){
      state.token = token
      this.commit('m_user/saveTokenToStorge')
    },
    //将token持久化保存
    saveTokenToStorge(state){
      uni.setStorageSync('token',JSON.stringify(state.token))
    },
    //更新用户信息
   updateUserInfo(state,userinfo){
     state.userinfo = userinfo
     //触发m_user模块下的saveUserInfoToStorge方法将数据持久化保存
     this.commit('m_user/saveUserInfoToStorge')
   },
   //持久化保存用户信息
   saveUserInfoToStorge(state){
     uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
   }
  },
  getters:{
    
  }
}