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
      ...mapState('m_user',['token','userinfo'])
    },
    methods:{
      ...mapMutations('m_user',['updateUserInfo','updateToken']),
      async getUserProfile(){
        const res = await uni.getUserProfile({
          desc:'登录授权'
        }).catch(err=>err)
        if(res.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('你已取消授权')
        this.getToken(res)
      },
      //获取token的值
      async getToken(info){
        console.log(info)
        //获取code对应的值
        const res = await uni.login().catch(err => err)
        // console.log(res)
        if(res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
        //准备登录请求的参数
        const query={
          code:res.code,
        }
        const {data:loginResult} = await uni.$http.post('/wxxlogin',query)
        // console.log(loginResult)
        if(loginResult.code !== 200) {
          return uni.$showMsg('登录失败!')
        }
        this.updateToken(loginResult.token)
        //将登录用户的信息和返回的用户信息合成一个对象
        let caijianinfo = {
          nickName:info.userInfo.nickName,
          avatarUrl:info.userInfo.avatarUrl
        }
        // console.log(caijianinfo,'裁剪后的字段')
        let mergeUserInfo = {...caijianinfo,...loginResult.wxxUser}
        this.updateUserInfo(mergeUserInfo)
        // loginResult.wxxUser.nickName = info.userInfo.nickName
        // loginResult.wxxUser.avatarUrl = info.userInfo.avatarUrl
        // this.updateUserInfo(loginResult.wxxUser)
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