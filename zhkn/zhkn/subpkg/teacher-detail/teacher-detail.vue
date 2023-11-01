<template>
  <view class="expert-detail" :style="{height:contentHeight + 'px'}">
    <view class="list-item">
      <!-- 老师图标 -->
      <view class="logo">
        <image :src="teacherInfo.avatar" mode="widthFix"></image>
      </view>
      <!-- 右侧专家的信息 -->
      <view class="expert-info">
        <!-- 姓名和标签 -->
        <view class="name-tag">
          <view class="name">
            {{teacherInfo.tianbaoshiName}}
          </view>
          <view class="tag">
            <view class="tag-item" v-for="(item,index) in labelInfo" :key="index">
              {{item.labelName}}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="introduce-detail">
      <!-- 专家简介 -->
      <view class="introduce">
        <view class="title">
          专家简介
        </view>
        <view class="introduce-info">
          {{teacherInfo.produce}}
        </view>
      </view>
    </view>
    <view class="free-consult" @click="gotoExpertBook">
      <view class="free-btn">
        免费咨询
      </view>
    </view>
  </view>  
</template>

<script>
  export default {
    data() {
      return {
        teacherInfo:{},
        labelInfo:[],
        contentHeight:0,
      };
    },
    onLoad(options) {
      const that = this
      uni.getSystemInfo({
        success: function (res) {
        // 获取窗口高度（屏幕高度）
        const windowHeight = res.screenHeight;
        // 获取底部 TabBar 的高度
        const tabBarHeight = res.platform === 'android' ? 50 : 56; // 假设 Android 平台的底部 TabBar 高度为 50px，iOS 为 56px
        // 计算除了底部 TabBar 高度之外的高度
        that.contentHeight = windowHeight;
        }
      })
      this.teacherInfo = JSON.parse(options.teacherInfo)
      console.log(this.teacherInfo)
      this.getExpertTag()
    },
    methods:{
      async getExpertTag(){
        const res = await uni.$http.get(`/system/user/getMaster/${this.teacherInfo.userId}`)
        this.labelInfo = res.data.labelInfo
        console.log(this.labelInfo)
      },
      gotoExpertBook(){
        let teacherObject = JSON.stringify(this.teacherInfo)
        uni.navigateTo({
          url:'/subpkg/expert-booked/expert-booked?teacherInfo='+teacherObject
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.expert-detail{
  background-color: #f8f8f8;
  position: relative;
  box-sizing: border-box;
}
.list-item{
  display: flex;
  width: 100%;
  height: 200px;
  background-color: #ee7e67;
  align-items: center;
  padding-left: 5px;
  .logo{
    image{
      width: 50px;
      height: 50px;
    }
  }
  .expert-info{
    .name-tag{
      .name{
        color: #fff;
        font-size: 22px;
        margin-bottom: 5px;
      }
      .tag{
        display: flex;
        font-size: 13px;
        .tag-item{
          margin-left: 5px;
          color:#ff6668;
          padding: 2px 5px;
          background-color: #ffeedf;
        }
      }
    }
  }
}
.introduce-detail{
  border-radius: 10px 10px 0 0;
  position: relative;
  background-color: #fff;
  top: -20px;
  box-shadow: 0 10px 5px #f7f7f7;
  padding-bottom: 10px;
  .introduce{
    padding: 20px;
    .title{
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  .introduce-info{
    font-size: 14px;
    color: #5b5b5b;
  }
}
.free-consult{
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  height: 60px;
  justify-content: center;
  position: absolute;
  bottom: 70px;
  left: 0;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  .free-btn{
    text-align: center;
    line-height: 38px;
    width: 90%;
    color:#fff;
    font-size: 16px;
    background-color: #ed6f49;
    border-radius: 20px;
  }
}
</style>
