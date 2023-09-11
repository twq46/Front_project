<template>
  <view>
     <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" 
    :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="cateClick(item)">
        <image :src="item.image_src" class="nav-img" mode=""></image>
      </view>
    </view>
    <!--楼层区域  -->
    <view class="floor-list">
      <view class="floor-item"  v-for="(item,i) in floorList">
        <!-- 楼层的标题 -->
        <image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
        <!-- 楼层里的图片 -->
        <view class="image_list">
          <!-- 左侧大图片的盒子 -->
          <navigator class="image_left" :url="item.product_list[0].url">
            <!-- mode="widthFix"图片高度自适应 -->
            <image :src="item.product_list[0].image_src"  :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧四个图片的盒子 -->
          <view class="image_right" >  
            <navigator class="image_right_item" v-for="(imageItem,i2) in item.product_list" :key="i2" :url="imageItem.url">
              <image v-if="i2 !== 0" :src="imageItem.image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  // import {getSwiperListInfo} from '../../network/home.js'
  export default {
    data() {
      return {
        //轮播图的数据
        swiperList:[],
        //分类的数据
        navList:[],
        //楼层的数据
        floorList:[],
      };
    },
    onLoad(){
      //调用方法，获取轮播图数据
      this.getSwiperList()
      //获取分类数据
      this.getNavList()
      //获取楼层数据
      this.getFloorList()
    },
    methods:{
      async getSwiperList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        //请求失败
        if(res.meta.status !== 200){
          return uni.$showMsg()
        }
        this.swiperList = res.message
        uni.$showMsg('666请求成功')
        
      },
      async getNavList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        if(res.meta.status !== 200){
          return uni.$showMsg()
        }
        this.navList = res.message
      },
      cateClick(item){
        console.log(item)
        if(item.name === '分类'){
          //跳转到tabbar页面
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
      async getFloorList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
        res.message.forEach(floor =>{
          floor.product_list.forEach(floorItem=>{
            //以问号将navigator_url分成两个数组，取后面一个数组
             floorItem.url = '/subpkg/goods_list/goods_list?' + floorItem.navigator_url.split('?')[1]
          })
         
        })
        if(res.meta.status !== 200) return uni.$showMsg()
        this.floorList = res.message
        console.log(res)
      },
    }
  }
</script>

<style lang="scss">
swiper {
 height: 330rpx;

 .swiper-item,
 image {
   width: 100%;
   height: 100%;
 }
}
.nav-list{
    display: flex;
    justify-content: space-around;
    margin: 15px;
    .nav-img{
      width: 128rpx;
      height: 140rpx;
    }
  }
  
.floor-title{
  width: 100%;
  height: 60rpx;
}
.image_right{
  display: flex;
  //一行放不下的时候换行
  flex-wrap: wrap;
  justify-content: space-around;
}
.image_list{
  display: flex;
  padding-left: 10rpx;
}

</style>
