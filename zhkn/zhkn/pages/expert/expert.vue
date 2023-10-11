<template>
  <view>
    <view class="topimg">
      <image src="../../static/expertTop.png" mode="widthFix"></image>
    </view>
    <view class="expert-list">
      <view class="expert-title">
        推荐专家
      </view>
      <view class="list" v-for="(item, i) in teacherList" :key="i">
        <my-expert-item :expert-detail="item"></my-expert-item>
      </view>
    </view>
    <!-- 专家指导介绍 -->
    <view class="image1">
      <image src="../../static/expert1.png" mode="widthFix"></image>
      <image src="../../static/expert2.png" mode="widthFix"></image>
      <image src="../../static/expert3.png" mode=""></image>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        query:{
          pageNum:1,
          pageSize:10,
        },
        teacherList:[]
      };
    },
    onLoad() {
      this.getTeacherList()
    },
    methods:{
      async getTeacherList(){
        const res = await uni.$http.get('/testExpert/listExpert',this.query)
        this.teacherList = res.data.data
      },
    }
  }
</script>

<style scoped lang="scss">
.topimg{
  image{
    width: 100%;
    height: 60%;
  }
}
.expert-list{
  position: relative;
  top: -20px;
  background-color: #fff;
  padding: 10px;
  border-radius: 15px 15px 0 0;
  .expert-title{
    font-weight: bold;
  }
}
.image1{
  image{
    width: 100%;
  }
  
}
</style>
