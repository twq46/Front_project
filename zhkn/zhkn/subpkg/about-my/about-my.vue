<template>
  <view class="my-box">
    <view class="aboutmy">
      <rich-text :nodes="aboutmy"></rich-text>
    </view>
    <view class="loginout" @click="loginOutClick">
      <!-- 退出登录 -->
        退出登录
    </view>
  </view>
  
</template>

<script >
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        aboutmy:''
      };
    },
    onLoad() {
      this.getAboutData()
    },
    methods: {
      ...mapMutations('m_user',['updateToken','updateUserInfo']),
      //退出登录
      async loginOutClick(){
        const succ = await uni.showModal({
          title:'提示',
          content:'确认退出登录吗？'
        }).catch(err => err)
        //用户确定退出登录
        console.log(succ)
        if(succ && succ.confirm){
          this.updateToken('')
          this.updateUserInfo({})
          //跳转到登录界面
          uni.switchTab({
            url:'/pages/mine/mine'
          })
        }
      },
      getAboutData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/dynamicData/aboutUs',
          method:'GET',
          success: (res) => {
            console.log(res)
            this.aboutmy = res.data.data.content
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.aboutmy{
  padding: 10px 20px;
}
.my-box{
  .loginout{
    margin-top: 40px;
    width: 100%;
    text-align: center;
    padding: 10px 0; 
    border-radius: 8px;
    background-color: #f7f7f7;
  }
}

</style>
