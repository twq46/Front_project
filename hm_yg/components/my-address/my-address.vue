<template>
  <view>
    <!-- 选择收获地址按钮的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 渲染收获信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <!-- 收件人信息 -->
      <view class="row1">
        <view class="row-left">
          <view class="username">收货人：{{address.userName}}</view>
        </view>
        <view class="row-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <!-- 收货地址 -->
      <view class="row2">
        <view class="row2-left">收获地址：</view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
    <!-- 底部的分隔线 -->
    <image src="/static/addressbottom.png" class="address-border" mode="widthFix"></image>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        // address:{}
      };
    },
    computed:{
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['addstr'])
    },
    methods:{
      ...mapMutations('m_user',['updateAddress']),
      async chooseAddress(){
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        //这里需要在manifest.json文件的 源码视图->"mp-weixin"下添加"requiredPrivateInfos":["chooseAddress"]
        const succ = await uni.chooseAddress().catch(err => err)
        console.log(succ)
        // 2. 用户成功的选择了收货地址
        if (succ.errMsg === 'chooseAddress:ok') {
          // 为 data 里面的收货地址对象赋值
          // this.address = succ
          this.updateAddress(succ)
        }
      },
      
    }
  }
</script>

<style lang="scss">
.address-border{
  display: block;
  width: 100%;
  height: 50px;
}
.address-choose-box{
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-info-box{
  padding: 5px;
  .row1{
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    .row-right{
      display: flex;
    }
  }
  .row2{
    display: flex;
    align-items: center;
    .row2-left{
      white-space: nowrap;
    }
  }
}
</style>