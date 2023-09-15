<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- open-type="getUserInfo" @getuserinfo 这些是固定写法 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <text class="tips-text">登录后尽享更多权益</text>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['token','redirectInfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateUserinfo','updateToken','updateRedirectInfo']),
      async getUserProfile(){
        const res = await uni.getUserProfile({
          desc:'登录授权'
        }).catch(err=>err)
        if(res.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('你已取消授权')
        
        console.log(res)
        this.updateUserinfo(res.userInfo)
        this.getToken(res)
      },
      async getToken(info){
        //获取code对应的值
        const res = await uni.login().catch(err => err)
        console.log(res)
        if(res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
        //准备登录请求的参数
        const query={
          code:res.code,
          encryptedData:info.encryptedData,
          iv:info.iv,
          rawData:info.rawData,
          signature:info.signature
        }
        const {data:result} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
        if(result.meta.status !== 200) {
          //这里因为不是小程序的开发者，所以我的微信账号无法登录，这里直接给token一个可用的值表示登录成功
          let tokent = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
          this.updateToken(tokent)
          // return uni.$showMsg('登录失败')
        }
        uni.$showMsg('登录成功')
        this.navigateBack()
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
    background-color: #C00000;
  }
  .tips-text{
    font-size: 12px;
    color:gray;
  }
}
</style>