<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- open-type="getUserInfo" @getuserinfo 这些是固定写法 -->
    <button type="primary" class="btn-login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键登录</button>
    <!-- <button type="primary" class="btn-login" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber" @click="getPhoneNumber">一键登录</button> -->
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        secondCode:''
      };
    },
    computed:{
      ...mapState('m_user',['token','userinfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateCwbNum','updateCubTotal','updateUserId']),
      getPhoneNumber(e){
        this.secondCode = e.detail.code
        this.getToken()
      },
      // async getUserProfile(){
      //   const res = await uni.getUserProfile({
      //     desc:'登录授权'
      //   }).catch(err=>err)
      //   if(res.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('你已取消授权')
      //   this.getToken(res)
      // },
      
      //获取token的值
      async getToken(){
        //第一次获取code对应的值
        const res = await uni.login().catch(err => err)
        if(res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
        //准备登录请求的参数
        const query={
          code:res.code,
          // nickName:info.userInfo.nickName,
          // avatarUrl:info.userInfo.avatarUrl
        }
        const {data:loginResult} = await uni.$http.post('/wxxlogin',query)
        this.updateToken(loginResult.token)
        //二次发送请求获取手机号
        const secondQuery={
          code:this.secondCode,
          openId:loginResult.wxxUser.openId
        }
        const {data:getPhoneResult} = await uni.$http.post('/wxxgetPhone',secondQuery)
        getPhoneResult.wxxUser.rushNum = null
        getPhoneResult.wxxUser.rushTotalNum = null
        this.updateUserId(getPhoneResult.ruoyiUser.userId)
        console.log(getPhoneResult)
        
        this.updateUserInfo(getPhoneResult.wxxUser)
        //获取考生冲稳保的数量
        if(getPhoneResult.wxxUser.score !== null){//不是第一次登录
          const {data:cwbnumberRes} = await uni.$http.get(`/extendApp/getSchoolFirstNum?openId=${getPhoneResult.wxxUser.openId}&examProvince=${getPhoneResult.wxxUser.examProvince}&score=${getPhoneResult.wxxUser.score}&rank=${getPhoneResult.wxxUser.rank}&batch=本科`)
          if(cwbnumberRes.code === 200){
            this.updateCwbNum(cwbnumberRes.data)
            this.updateCubTotal(cwbnumberRes.total)
          }
        } 
        uni.$showMsg('登录成功!')
        // this.navigateBack()
      },
      navigateBack(){
        if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
      
    }
  }
</script>

<style lang="scss">
.login-container{
  height: 750rpx;
  background-color: #F8F8F8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  &::after{
    content: '';
    display: block;
    width: 100%;
    height: 40px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }
  .btn-login{
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #ff5e42;
  }
  .tips-text{
    font-size: 12px;
    color:gray;
  }
}
</style>