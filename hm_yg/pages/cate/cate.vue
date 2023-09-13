<template>
  <view>
    <!-- 使用自定义的组件 -->
    <my-search @gotoSearch="gotoSearch"></my-search>
    <view class="scroll-view-content">
      <!-- 左侧滑动区域 -->
      <scroll-view class="scroll-view-left" scroll-y="true" :style="{height:windowHeight + 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view class="left-scroll-view-item" :class="{active:activeIndex === i}" @click="blockClick(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view class="scroll-view-right" scroll-y="true" :style="{height: windowHeight + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item,i2) in cateLevel2" :key="i2">
         <!-- 二级分类的标题 -->
          <view class="cate-lv2-title">
            /{{item.cat_name}}/
          </view>
          <!-- 当前二级分类下的三级分类列表 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item.children" :key="i3" @click="gotoGoodlist(item3)">
              <!-- 三级分类的图片 -->
              <image :src="item3.cat_icon" mode="widthFix"></image>
              <!-- 三级分类的文本 -->
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
        
      </scroll-view>
    </view>
    
  </view>
 
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badgeMix],
    data() {
      return {
        windowHeight:0,
        cateList:[],
        cateLevel2:[],
        activeIndex:0,
        scrollTop:0
      };
    },
    onLoad(){
      //获取当前窗口的信息
      const sysInfo = uni.getSystemInfoSync()
      //当前可用窗口的高度，减去的50为搜索框的高度
      this.windowHeight = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods:{
      async getCateList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        //默认显示的第一项的二级分类
        this.cateLevel2 = res.message[0].children
      },
      //左侧菜单栏切换的时候
      blockClick(index){
        this.activeIndex = index;
        //重新为二级分类赋值
        this.cateLevel2 = this.cateList[index].children
        //只有每次赋的值不一样，才会生效，虽然有1px的偏差，但是用户感觉不到
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodlist(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-content{
  display: flex;
}
.scroll-view-left{
  width: 120px;
}
.left-scroll-view-item{
  background-color:#F7F7F7;
  line-height: 60px;
  text-align: center;
  font-size: 12px;
  //&符号表示这个元素既包含这个left-scroll-view-item类名，又包含active类名
  &.active{
    background-color: #FFF;
    position: relative;
    &::before{
      content: '';
      display: block;
      width: 3px;
      height: 30px;
      background-color: #C00000;
      position: absolute;
      top:50%;
      left:0;
      transform: translateY(-50%);
    }
  }
}

.cate-lv2-title{
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}

.cate-lv3-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .cate-lv3-item{
    display: flex;
    flex-direction: column;
    width: 33.33%;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    image{
      width: 60px;
      height: 60px;
    }
    text{
      font-size: 12px;
    }
  }
}
</style>
