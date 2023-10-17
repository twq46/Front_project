<template>
  <view>
   <view class="introduce-box">
    <view class="introduce-title">
      专业介绍
    </view>
    <view class="introduce-text" :class="{overflowActive:flag}">
      <rich-text :nodes="majorDetail.summary"></rich-text>
    </view>
    <view class="more" @click="showTag">{{flag ? "收起" : "查看全部"}}</view>
   </view>
    <view class="major-class">
      <view class="title">
        主修课程
      </view>
      {{majorDetail.majorClass}}
    </view>
    <view class="degree">
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        secondSubject:'',
        majorDetail:{},
        flag:false,
      };
    },
    onLoad(options) {
      uni.setNavigationBarTitle({
        title:options.secondSubject
      })
      this.secondSubject = options.secondSubject
      this.getMajorDetail()
    },
    methods:{
        getMajorDetail(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/majorApp/getSummary',
          method:'GET',
          data:{
            secondSubject:this.secondSubject
          },
          success: (res) => {
            this.majorDetail = res.data.data
            // console.log(res)
          }
        })
      },
      showTag(){
        this.flag = !this.flag
      },
    },
  }
</script>

<style scoped lang="scss">
.introduce-box{
  margin-top: 5px;
  box-shadow: 1px 5px 5px #eee;
  .introduce-title{
    font-weight: bold;
    padding: 10px;
  }
  .introduce-text{
    padding: 0 10px;
    height: 180px;
    overflow: hidden;
  }
  .overflowActive{
    height:auto;
    overflow: visible;
  }
  .more{
    text-align: center;
    font-size: 15px;
    color: #ed6c4a;
  }
}
.major-class{
  padding: 10px;
  margin-top: 10px;
  .title{
    font-weight: bold;
  }
}
</style>
