<template>
  <view>
    <!-- 地区、类型、专业、查询范围过滤信息 -->
    <view class="filter-data" :style="{'margin-top':marginTop}">
      <view class="filter-box">
        <view class="filter-text" v-for="(item,i) in filterTitle" :key="i"  @click="activeFilterTitle(i)" >
          <text :class="{active:activeindex == i & filterActive}" :style="{'font-size':fontSize}">{{item.name}}</text>
          <uni-icons type="bottom" size="13"></uni-icons>
        </view>
      </view>
      <!-- 过滤信息展开区域 -->
      <view class="filter-expand" v-if="filterActive">
        <scroll-view scroll-y="true" style="height: 160px;">
          <view class="filter-list" >
            <view v-for="(item,index) in filterConten" :key="index"  class="filter-item">{{item}}</view>
          </view>
        </scroll-view>
        <!-- 重置和确认按钮 -->
        <view class="btn-reset-confirm">
          <button>重置</button>
          <button class="confirm-btn">确定</button>
        </view>
      </view>
    </view>
           
  </view>
</template>

<script>
  export default {
    name:"my-filterData",
    props:{
      filterTitle:{
        type:Array,
      },
      marginTop:{
        type:String,
        default:'0px'
      },
      fontSize:{
        type:String,
        default:'14px'
      }
    },
    data() {
      return {
        activeindex:null,
        filterActive:false,
        filterConten:['澳门','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港'],
      };
    },
    methods:{
      activeFilterTitle(index){
        this.activeindex = index
        this.filterActive = !this.filterActive
      },
    }
  }
</script>

<style lang="scss">
.filter-data{
  position: relative;
  .filter-box{
    display: flex;
    justify-content: space-around;
    padding-top: 5px;
    
    .filter-text{
      width: 20%;
      height: 25px;
      border-radius: 5px;
      line-height: 25px;
      text-align: center;
      background-color: #f7f7f7;
      font-size: 14px;
      padding: 3px;
    }
    .active{
      color:#ef845e;
    }
  }
  .filter-expand{
    position: absolute;
    z-index: 2;
    background-color: #fff;
    .filter-list{
      display: flex;
      flex-wrap: wrap;
      .filter-item{
      width: 21%;
      height: 36px;
      border: 1px solid #edeeef;
      margin: 10px 5px;
      text-align: center;
      line-height: 36px;
      border-radius: 3px;
    }
    }
    
  }
  .btn-reset-confirm{
    display: flex;
    button{
      width: 45%;
    }
    .confirm-btn{
      color:#fff;
      background-color: #ef845e;
    }
  }
}

</style>