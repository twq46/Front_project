<template>
  <view>
    <view class="topimage">
      <image src="../../static/images/editScore.png" mode="widthFix"></image>
    </view>
    <uni-card class="scorecard">
    	<view class="title">
    	  2023年高考模拟填报
    	</view>
      <!-- 学生成绩等的信息信息 -->
      <view class="detail-info">
        <view class="info-item" v-for="(item,i) in labelinfo" :key="i">
          <view class="left-info">
            {{item.label}}
          </view>
          <view class="right-info">
            {{item.name}}
          </view>
        </view>
      </view>
      <!-- 提示信息 -->
      <view class="tip">
        <view>*高考成绩和位次只有1次修改机会，</view>
        <view>
          其准确性决定推荐结果和录取概率，请认真填写
        </view>
      </view>
      <!-- 提交按钮 -->
      <view class="confirm">
         <view class="confirmtwq">
          确认提交
         </view>
      </view>
     
    </uni-card>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userInfo:{},
        labelinfo:[]
      };
    },
    onLoad(options) {
      this.userInfo = JSON.parse(options.userinfo)
      this.labelinfo = [
        {label:'高考省份',name:this.userInfo.province},
        {label:'高考科目',name:this.userInfo.type},
        {label:'高考成绩',name:this.userInfo.score},
        {label:'高考位次',name:this.userInfo.rank},
        {label:'同分人数',name:'92'}
      ]
    }
  }
</script>

<style scoped lang="scss">
.topimage{
  image{
    width: 100%;
  }
}
.scorecard{
  position: relative;
  top: -40px;
  .title{
    font-weight: bold;
    text-align: center;
  }
  .detail-info{
    margin-top: 30px;
    .info-item{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
  }
  .tip{
    color: #7e7e7e;
    font-size: 13px;
  }
  .confirm{
    display: flex;
    justify-content: center;
    margin: 20px 0;
    .confirmtwq{
      width: 80%;
      height: 40px;
      font-size: 15px;
      color:white;
      text-align: center;
      line-height: 40px;
      border-radius: 30px;
      background-color: #ee8358;
    }
    
  }
  
}
</style>
