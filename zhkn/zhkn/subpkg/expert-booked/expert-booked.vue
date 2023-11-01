<template>
  <view class="booked-box">
    <!-- 您的姓名 -->
    <view class="name">
      您的姓名
      <view class="name-input">
        <input type="text" v-model="inputName" placeholder="请输入您的称呼">
      </view>
    </view>
    <!-- 联系方式 -->
    <view class="name">
      联系方式
      <view class="name-input">
        <input type="text" @input="inputPhoneNumber" v-model="phoneNumber" placeholder="请输入您的手机号" maxlength="11">
      </view>
    </view>
    <!-- 咨询内容 -->
    <view class="name">
      咨询内容
      <view class="name-input">
        <input class="zx-box" v-model="askContent" type="text" placeholder="请输入您要咨询的内容">
      </view>
    </view>
    
    <!-- 提交 -->
    <view class="submit-btn" :class="{active:phomeNumberLengthIselev}" @click="submitAskContent">
      提交
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        phoneNumber:'',
        inputName:'',
        askContent:'',
        inputPhoneNumberTimer:null,
        phomeNumberLengthIselev:false,
        teacherInfo:{}
      };
    },
    onLoad(options) {
      this.teacherInfo = JSON.parse(options.teacherInfo)
    },
    computed:{
      ...mapState('m_user',['userinfo','userId'])
    },
    methods:{
      inputPhoneNumber(e){
        clearTimeout(this.inputPhoneNumberTimer)
        this.inputPhoneNumberTimer = setTimeout(()=>{
          if(e.detail.cursor === 11){
            this.phomeNumberLengthIselev = true
          }else{
             this.phomeNumberLengthIselev = false
          }
        },500)
        
      },
      async submitAskContent(){
        if(this.phomeNumberLengthIselev){
          let askQuery = {
            user_id:this.userId,
            tianbaoshi_id:this.teacherInfo.tianbaoshiId,
            ask_name:this.inputName,
            ask_phone:this.phoneNumber,
            tianbaoshiName:this.teacherInfo.tianbaoshiName,
            ask_content:this.askContent
          }
        const {data:res} = await uni.$http.post('/testExpert/addAskExpert',askQuery)
        if(res.code == 200){
          uni.$showMsg('咨询成功，等待填报师处理！')
          uni.navigateBack({
            delta:1
          })
        }
          
          
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.booked-box{
  padding: 20px;
  .name{
    margin-bottom: 30px;
    .name-input{
      background-color: #f6f6f6;
      border-radius: 10px;
      margin-top: 10px;
      input{
        padding:20px 10px;
      }
      .zx-box{
        padding-bottom: 100px;
      }
    }
  }
  
  .submit-btn{
    text-align: center;
    padding: 15px 0;
    border-radius: 50px;
    color: #fff;
    background-color: #f5c2ae;
    
  }
  .active{
    background-color: #ee8055;
  }
}
</style>
