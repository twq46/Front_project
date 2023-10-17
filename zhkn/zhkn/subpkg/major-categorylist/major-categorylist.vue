<template>
  <view class="major-box">
    <uni-card v-for="(item,i) in major" :key="i" @click="gotomajorDetail(item)">
      <view class="majorname-card">
        <view class="">
        {{item}}
        </view>
        <view class="">
          >
        </view>
      </view>
      
    </uni-card>
  </view>
</template>

<script>
  export default {
    config:{
      navigationBarTitleText: '新页面的标题'
    },
    data() {
      return {
        major:[],
        titlename:''
      };
    },
    onLoad(options) {
      uni.setNavigationBarTitle({
        title:options.titlename
      })
      // console.log(options)
      this.major = JSON.parse(options.major)
    },
    methods:{
      gotomajorDetail(secondSubject){
        uni.navigateTo({
          url:'/subpkg/major-detail/major-detail?secondSubject=' + secondSubject
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.major-box{
  .majorname-card{
    display: flex;
    justify-content: space-between;
  }
}

</style>
