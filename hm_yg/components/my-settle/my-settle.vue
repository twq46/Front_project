<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio">
      <radio :checked="isFullCheck" color="#C00000" @click="checkAllHandler"/><text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">¥{{checkTotalPrice}}</text>
    </view>
    <!-- 结算 -->
    <view class="btn-settle">结算({{checkTotal}})</view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
      };
    },
    
    computed:{
      ...mapGetters('m_cart',['checkTotal','total','checkTotalPrice']),
      isFullCheck(){
        return this.total === this.checkTotal
      },
    },
    methods:{
      ...mapMutations('m_cart',['checkAllGoods']),
      checkAllHandler(){
        this.checkAllGoods(!this.isFullCheck)
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container{
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left:  5px;
  .radio{
    display: flex;
    align-items: center;
  }
  .amount-box{
    .amount{
      color: #C00000;
      font-weight: bold;
    }
  }
  .btn-settle{
    height: 100%;
    line-height: 50px;
    color: white;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
    background-color: #C00000;
  }
}
</style>