<template>
  <view class="college-item" >
    <view class="item-image">
      <image :src="college.logo" mode=""></image>
    </view>
    <view class="item-text">
      <view class="college-name">
        {{college.schoolname}}
      </view>
      <view class="college-type">
        <view class="province ">
          {{college.province}}
        </view>
        <view class="level mar-left">
          {{college.level}}
        </view>
        <view class="type mar-left">
          {{college.type}}
        </view>
        <view class="f985 mar-left" v-if="college.f985 !== 0">
          985
        </view>
        
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    name:"my-college-item",
    props:{
      college:{}
    },
    data() {
      return {
        
      };
    },
    methods:{
      
    }
  }
</script>

<style scoped lang="scss">
.college-item{
  display: flex;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  .item-image{
    image{
      width: 50px;
      height: 50px;
    }
  }
  .item-text{
    margin-left: 10px;
    .college-name{
      font-size: 18px;
    }
    .college-type{
      display: flex;
      font-size: 13px;
      color: #5b5b5b;
      .mar-left{
        margin-left: 5px;
      }
    }
  }
}
</style>