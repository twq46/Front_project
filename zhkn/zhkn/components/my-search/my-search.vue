<template>
  <view class="my-search-container" @click="searchHandler">
    <view class="my-search-box">
      <!-- 使用uni-ui提供的图标组件 -->
      <uni-icons type="search" size="20"></uni-icons>
      <text class="placeholder">搜索院校</text>
    </view>
    
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      searchHandler(){
        this.$emit('gotoSearch')
      }
    }
    
  }
</script>

<style scoped lang="scss">
.my-search-container{
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  background-color: #C00000;
  .my-search-box{
    height: 36px;
    width: 100%;
    background-color: #fff;
    border-radius: 18px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    .placeholder{
      margin-left: 5px;
      font-size: 15px;
    }
  }
}
</style>