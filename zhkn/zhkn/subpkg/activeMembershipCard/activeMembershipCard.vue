<template>
  <view >
    <view class="toplogo">
      <image src="../../static/images/activeVipLogo.png" mode="widthFix"></image>
    </view>
    <!-- N码激活 -->
    <view class="Ncode-box">
      <view class="Ncode-title">
        N码激活VIP
      </view>
      <view class="Ncodeinput">
        <input type="text" placeholder="请输入N码" v-model="Ncode" @input="inputCode">
      </view>
      <view class="confirmActivebtn" :class="{active:activeBtn}" @click="activeVipClick">
        确定激活
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        Ncode:'',
        ncodeTimer:null,
        activeBtn:false
      };
    },
    computed:{
      ...mapState('m_user',['userinfo']),
    },
    methods:{
      ...mapMutations('m_user',['updateUserIsVip']),
      inputCode(e){
        clearTimeout(this.ncodeTimer)
        this.ncodeTimer = setTimeout(()=>{
          if(e.detail.cursor<10){
            this.activeBtn = false
          }else{
            this.activeBtn = true
          }
        },500)
      },
      async activeVipClick(){
        const query = {
          cardId:this.Ncode,
          openId:this.userinfo.openId
        }
        const {data:res} = await uni.$http.post(`/activeWxxVip?cardId=${query.cardId}&openId=${query.openId}`)
        if(res.code !== 200) return uni.$showMsg('激活失败')
        this.updateUserIsVip(1)
        uni.navigateTo({
          url:'/pages/mine/mine'
        })
        uni.$showMsg('激活成功！')
      },
    }
  }
</script>

<style scoped lang="scss">
.toplogo{
  image{
    width: 100%;
  }
}
.Ncode-box{
  margin: 10px;
  .Ncodeinput{
    margin-top: 10px;
    background-color: #eee;
    border-radius: 8px;
    input{
      padding: 10px;
    }
  }
  .confirmActivebtn{
    margin-top: 40px;
    color:white;
    text-align: center;
    padding: 10px 0;
    background-color: #d0d0d0;
    border-radius: 10px;
  }
  .active{
    background-color: #ed7766;
  }
}
</style>
