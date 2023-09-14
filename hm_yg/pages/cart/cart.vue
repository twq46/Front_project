<template>
  <view class="cart-boxT" v-if="cart.length !== 0">
    <!-- 地址栏 -->
    <my-address></my-address>
    <!-- 购物车标题界面 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 右侧的文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 循环渲染购物车中的商品信息 -->
    <uni-swipe-action>
      <block v-for="(item,index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
           <my-goods :goods="item" :showRadio="true" :showCount="true" @radioStatusChange="radioStatusChange" @numChange="numChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车-->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty.png" mode="widthFix" class="empty-img"></image>
    <text class="tip-text">空空如也</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {mapState,mapMutations} from 'vuex'
  export default {
    mixins:[badgeMix],
    computed:{
      ...mapState('m_cart' , ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    methods:{
      ...mapMutations('m_cart',['updateGoodsState','updateGoodsNum','deleteGoods']),
      radioStatusChange(e){
        this.updateGoodsState(e)
      },
      numChange(e){
        // console.log(e)
        this.updateGoodsNum(e)
        //更新tabBar徽标的值
        this.setBadge()
      },
      swipeActionClickHandler(goods){
        this.deleteGoods(goods)
        //更新tabBar徽标的值
        this.setBadge()
      }
    }
  }
</script>

<style lang="scss">
.cart-boxT{
  padding-bottom: 50px;
}
.cart-title{
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text{
    margin-left: 5px;
    font-size: 14px;
  }
}
.empty-cart{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top:150px ;
  .empty-img{
    width: 90px;
    height: 90px;
  }
  .tip-text{
    font-size: 12px;
    color: gray;
  }
}
</style>
