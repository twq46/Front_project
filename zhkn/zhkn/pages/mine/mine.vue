<template>
  <view class="">
    <!-- 用户未登录 -->
    <my-login v-if="!token"></my-login>
    <!-- 用户已登录 -->
    <my-userinfo v-else :followwishnum="followwishnum" :endtime="vipendTime"></my-userinfo>
    
  </view>
  
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        followwishnum:null,
        vipendTime:null,
      };
    },
    computed:{
      ...mapState('m_user',['token','userinfo'])
    },
    //页面每次显示的时候
    onShow() {
      if(this.token){//登录之后
        this.getVolunteerNum()
        this.getVipDeadLine()
      }
    },
   watch:{
     userinfo(){
       this.getVolunteerNum()
       this.getVipDeadLine()
     }
   },
   methods:{
     ...mapMutations('m_user',['updateToken']),
     async getVolunteerNum(){
       const {data : res} = await uni.$http.get(`/wishWX/getFollowedWishNum?openId=${this.userinfo.openId}`)
       if(res.code === 401){
         uni.$showMsg('登录失效，请重新登录！')
         this.updateToken('')
       }
       this.followwishnum = res.data.followedWishNum
     },
     async getVipDeadLine(){
       const {data:res} = await uni.$http.post(`/getVipEndTime?openId=${this.userinfo.openId}`)
       this.vipendTime = res.data.endtime
       console.log(res)
     }
   },
  }
</script>

<style scoped lang="scss">



</style>
