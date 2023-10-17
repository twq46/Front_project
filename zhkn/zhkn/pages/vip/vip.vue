<template>
  <view>
    <view class="vipserve" :style="{backgroundColor:bgColor,color:fontcolor}">
      会员服务
    </view>
    <scroll-view :scroll-y="true" @scroll="scroll" :style="{height:contentHeight + 'px'}">
      <view class="topImage">
        
        <image src="../../static/images/viptopimage.png" mode="widthFix"></image>
        
        <!-- 绑定会员卡 -->
        
      </view>
      <!-- vip服务 & 1v1尊享卡 -->
      <view class="vip-1v1">
        <!-- vip服务 -->
        <view class="vipservet" :style="{background:vipbgc,'border-color':vipbordercolor}" @click="vipchangebgc">
          <view class="title">
            VIP服务
          </view>
          <view class="price">
            <view class="nowprice">
              <text class="price-logo">¥</text>
              <text class="price-num">{{priceValue.vipvalue}}</text>
            </view>
            <view class="originprice">
              <text class="price-logo">原价:</text>
              <text class="orign-num">¥{{priceValue.originvipvlue}}</text>
            </view>
            <view class="detail-info">
              <text class="info">升级VIP可获得上次修改成绩和位次的机会</text>
            </view>
          </view>
        </view>       
        <!-- 1v1尊享卡 -->
        <view class="vipservet" :style="{background:onevonebgc,'border-color':onebordercolor}" @click="onechangebgc">
          <view class="title">
            1v1尊享卡
          </view>
          <view class="price">
            <view class="nowprice">
              <text class="price-logo">¥</text>
              <text class="price-num">{{priceValue.onevalue}}</text>
            </view>
            <view class="originprice">
              <text class="price-logo">原价:</text>
              <text class="orign-num">¥{{priceValue.oneoriginvalue}}</text>
            </view>
            <view class="detail-info">
              <text class="info">志愿专属报考方案，报更好的志愿就业更轻松</text>
            </view>
          </view>
        </view>
        
      </view>
      <view class="vipright">
        <image src="../../static/images/vipnineright.png" mode="widthFix"></image>
        <image src="../../static/images/usevipserve.png" mode="widthFix"></image>
      </view>
    </scroll-view>
    
   <view class="pay">
     <view class="paynumber">
       <text class="number">¥{{payValue.payprice}} </text>
       <text class="originnumber linethrough">¥{{payValue.payoriginprice}}</text>
       <text class="originnumber">限时优惠</text>
     </view>
     <view class="paybutton" @click="payCurrent">
       立即支付
     </view>
   </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        bgColor:'rgba(255,255,255,0)',//初始背景颜色透明度为0
        contentHeight:0,
        fontcolor:'white',
        vipbgc:'#fef7f1',
        vipbordercolor:'#f5d3bb',
        onevonebgc:'white',
        onebordercolor:'#eee',
        priceValue:{
          vipvalue:159,
          originvipvlue:999,
          onevalue:4980,
          oneoriginvalue:5980,
        },
        payValue:{
          payprice:0,
          payoriginprice:0
        }
      };
    },
    onLoad() {
      this.payValue.payprice = this.priceValue.vipvalue
      this.payValue.payoriginprice = this.priceValue.originvipvlue
      // 存储 Vue 实例的引用
      const that = this;
      // 获取系统信息
      uni.getSystemInfo({
        success: function (res) {
        // 获取窗口高度（屏幕高度）
        const windowHeight = res.windowHeight;
        // 获取底部 TabBar 的高度
        const tabBarHeight = res.platform === 'android' ? 50 : 56; // 假设 Android 平台的底部 TabBar 高度为 50px，iOS 为 56px
        // 计算除了底部 TabBar 高度之外的高度
        that.contentHeight = windowHeight;
        }
      });
      
    },
    methods:{
      // 点击立即支付
      payCurrent(){
        console.log('zhifu')
        uni.requestPayment({
          
        })
      },
      scroll: function(e){
        const screenHeight = uni.getSystemInfoSync().screenHeight;
        const scrollTop = e.detail.scrollTop;
        // 计算透明度，这里可以根据需要调整透明度的变化范围
        let opacity = Math.min(1, scrollTop / screenHeight);
        opacity = opacity > 0.3 ? 1 : opacity
        this.fontcolor = opacity > 0.01 ? 'black':'white'
        // 更新背景颜色
        this.bgColor = `rgba(255, 255, 255, ${opacity})`;
      },
      vipchangebgc(){
        this.vipbgc = '#fef7f1'
        this.vipbordercolor = '#f5d3bb'
        this.onevonebgc = 'white'
        this.onebordercolor = '#eee'
        this.payValue.payprice = this.priceValue.vipvalue
        this.payValue.payoriginprice = this.priceValue.originvipvlue
      },
      onechangebgc(){
        this.vipbgc = 'white'
        this.vipbordercolor = '#eee'
        this.onevonebgc = '#fef7f1'
        this.onebordercolor = '#f5d3bb'
        this.payValue.payprice = this.priceValue.onevalue
        this.payValue.payoriginprice = this.priceValue.oneoriginvalue
      },
    }
  }
  
</script>

<style scoped lang="scss">
.vipserve{
  width: 100%;
  //吸顶效果
  position: fixed;
  z-index: 99;
  text-align: center;
  padding: 8px 0;
}
.topImage{
  position: relative;
  
  image{
    width: 100%;
  }
}
.vip-1v1{
  display: flex;
  position: relative;
  top:-15px;
  background-color: white;
  border-radius: 15px;
  padding-top: 20px;
  justify-content: space-around;
  .vipservet{
    width: 40%;
    border: 1px solid #eee;
    text-align: center;
    padding:20px 13px 40px 13px;
    border-radius: 12px;
    .title{
      font-weight: bold;
      font-size: 18px;
    }
    .price{
      .nowprice{
        color:#cc985c;
        .price-num{
          font-size: 40px;
          font-weight: bold;
        }
      }
      .originprice{
        color: #666666;
        .orign-num{
          text-decoration: line-through;
        }
      }
      .detail-info{
        margin-top: 20px;
        color:#666666;
        font-size: 14px;
      }
    }
  }
  
}

.vipright{
  image{
    width: 100%;
  }
}
.pay{
  background-color: #fff;
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 66666666;
  display: flex;
  
  background: url('../../static/images/paybutton.png') no-repeat;
  background-size: 100% 60px;
  .paynumber{
    position: relative;
    top: 18px;
    left: 36px;
    .number{
      font-weight: bold;
      font-size: 18px;
      margin-right: 5px;
    }
    .originnumber{
      font-size: 14px;
    }
    .linethrough{
      text-decoration: line-through;
    }
  }
  
  .paybutton{
    position: relative;
    color: white;
    top: 18px;
    left:38%;
  }
}
</style>
