export default {
  namespaced:true,
  state:()=>({
    token:uni.getStorageSync('token') || '',
    uesrId:uni.getStorageSync('userId') || null,
    //用户信息兑现
    userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}')
  }),
  mutations:{
    updateRealName(state,name){
      state.userinfo.realName = name
      this.commit('m_user/saveUserInfoToStorge')
    },
    updateSex(state,sex){
      state.userinfo.gender = sex
      this.commit('m_user/saveUserInfoToStorge')
    },
    updateForeignType(state,foreignType){
      state.userinfo.foreignType = foreignType
      this.commit('m_user/saveUserInfoToStorge')
    },
    updateFroeignScore(state,score){
      state.userinfo.foreignScore = score
      this.commit('m_user/saveUserInfoToStorge')
    },
    updateSubject(state,physics){
      state.userinfo.physics = physics
      this.commit('m_user/saveUserInfoToStorge')
    },
    updateUserId(state,userId){
      state.userId = userId
      this.commit('m_user/saveToUserIdToStorge')
    },
    saveToUserIdToStorge(state){
      uni.setStorageSync('userId',JSON.stringify(state.userId))
    },
    //修改冲稳保数量
    updateCwbNum(state,csbNumObject){
      state.userinfo.rushNum = csbNumObject
      this.commit('m_user/saveUserInfoToStorge')
    },
    //修改冲稳保总数
    updateCubTotal(state,total){
      state.userinfo.rushTotalNum = total
      this.commit('m_user/saveUserInfoToStorge')
    },
    //修改是否为vip
    updateUserIsVip(state,vipValue){
      state.userinfo.vip = vipValue
      this.commit('m_user/saveUserInfoToStorge')
    },
    //修改用户省份
    updateUserProvince(state,province){
      state.userinfo.examProvince = province
      this.commit('m_user/saveUserInfoToStorge')
    },
    //修改用户排名
    updateUserRank(state,rank){
      state.userinfo.rank = rank
      this.commit('m_user/saveUserInfoToStorge')
    },
    //修改用户分数
    updateUserScore(state,score){
      state.userinfo.score = score
      this.commit('m_user/saveUserInfoToStorge')
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