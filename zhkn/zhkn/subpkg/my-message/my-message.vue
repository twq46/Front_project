<template>
  <view class="message-box">
    <view class="top-bgc"></view>
    <view class="card-box">
      <view class="itemlist">
       <view class="item" v-for="(item,index) in items" :key="index">
         <image :src="item.image" mode="widthFix"></image>
         <text>{{item.text}}</text>
       </view>
      </view>
      
      <view class="bottom-box">
        <!-- 底部显示栏 -->
        <agent-matters></agent-matters>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {text:'待办事项',image:'../../static/images/zhuyishixiang.png'},
          {text:'报考参考',image:'../../static/images/zhuyishixiang.png'},
          {text:'高考关注',image:'../../static/images/zhuyishixiang.png'},
          {text:'优惠活动',image:'../../static/images/zhuyishixiang.png'}],
        current: 0,
        colorIndex: 0,
        activeColor: '#007aff',
        styleType: 'text'
      };
    },
    methods:{
      onClickItem(e) {
        if (this.current != e.currentIndex) {
          this.current = e.currentIndex;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.top-bgc{
  height: 230px;
  background-color: #ef8567;
}
.card-box{
  background-color: #fff;
  height:200px;
  width: 95%;
  position: relative;
  top: -80px;
  left: 50%; /* 将元素的左边缘放在父容器的中心 */
  transform: translateX(-50%); /* 将元素的中心对齐到父容器的中心 */
  border-radius: 10px 10px 0 0;
  .itemlist{
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item{
      display: flex;
      width: 18%;
      flex-direction: column;
      image{
        width: 50px;
        height: 50px;
      }
    }
  }
  
  .bottom-box{
    padding: 0 10px;
    margin-top: 20px;
  }
}
</style>
