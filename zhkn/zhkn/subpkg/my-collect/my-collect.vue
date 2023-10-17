<template>
  <view class="cm-box" :style="{height:contentHeight+'px'}">
    <!-- 顶部 -->
    <view class="cm-item">
      <view class="college" @click="isShowCollege" :class="{active:showcollege}">
          院校
      </view>
      <view class="major" @click="isShowMajor" :class="{active:showmajor}">
        专业
      </view>
    </view>
   <!-- 底部展示区域 -->
   <view class="">
     <collect-college v-show="showcollege"></collect-college>
     <collect-major v-show="showmajor"></collect-major>
   </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showcollege:true,
        showmajor:false,
        contentHeight:0
      };
    },
    onLoad() {
      // 存储 Vue 实例的引用
      const that = this;
      // 获取系统信息
      uni.getSystemInfo({
        success: function (res) {
        // 获取窗口高度（屏幕高度）
        const windowHeight = res.screenHeight;
        console.log(res.screenHeight,'twq')
        // 获取底部 TabBar 的高度
        const tabBarHeight = res.platform === 'android' ? 50 : 56; // 假设 Android 平台的底部 TabBar 高度为 50px，iOS 为 56px
        that.contentHeight = windowHeight;
        }
      });
      
    },
    methods:{
      isShowCollege(){
        this.showcollege = true
        this.showmajor = false
      },
      isShowMajor(){
        this.showcollege = false
        this.showmajor = true
      }
    }
  }
</script>

<style scoped lang="scss">
.cm-box{
  background-color: #f5f5f5;
  .cm-item{
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 10px 0;
    box-sizing: border-box;
    .active{
      color: #ff5847;
      border-bottom: 3px solid #ed6c4a;
    }
    .college{
      
    }
    .major{
      
    }
  }
  
}
</style>
