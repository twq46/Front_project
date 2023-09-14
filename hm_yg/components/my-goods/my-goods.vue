<template>
  <view class="goods-item">
    <!-- 左侧的盒子 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" @click="radioClickHandler" color="#C00000" v-if="showRadio"></radio>
      <image :src="goods.goods_small_logo || defaultPic" mode="" class="goods-pic"></image>
    </view>
    <!-- 右侧的盒子 -->
    <view class="goods-item-right">
      <!-- 商品的名字 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <!-- 商品的价格 -->
      <view class="goods-info-box">
        <view class="goods-price">¥ {{goods.goods_price | tofixed}}</view>
        <!-- 商品数量 -->
        <uni-number-box :min="1" :value="goods.goods_count" @change="numChange"  v-if="showCount"></uni-number-box>
      </view>
    </view>
  </view>
        
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      },
      showRadio:{
        type:Boolean,
        //默认情况下不显示radio组件
        default:false
      },
      showCount:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    //价格过滤器
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    methods:{
      radioClickHandler(){
        this.$emit('radioStatusChange',{
          goods_id:this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      //监听nvabox数量的变化
      numChange(val){
        this.$emit('numChange',{
          goods_id:this.goods.goods_id,
          goods_count:+val
        })
      },
    }
  }
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex:1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price{
        color: #C00000;
        font-size: 16px;
      }
    }
  }
}

</style>