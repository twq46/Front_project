<template>
  <view>
    <view class="stick-box">
       <!-- 搜索框 -->
      <view class="search-box">
      <!-- 基本用法 -->
      <uni-search-bar @confirm="search" @input="input" cancelButton="none" placeholder="请输入学校名称"></uni-search-bar>
      </view>
      <!-- 分段器和过滤数据 -->
       <view>
        <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#ed6c4a"></uni-segmented-control>
        <!-- 地区、类型、专业、查询范围过滤信息 -->
        <view class="filter-box">
          <my-filterData :filter-title="filterTitle" :marginTop="'5px'"></my-filterData>
        </view>
        
       </view>
    </view>
    
    <!-- 各个选项卡的内容区域 -->
    <view class="content">
      <!-- 可冲击内容 -->
      <view v-show="current === 0">
        <college-card v-for="(item,i) in 3" :key="i"></college-card>
      </view>
      <!-- 较稳妥内容 -->
      <view v-show="current === 1">
        <college-card :canType="'稳'" :bgc="'#5eabf8'"></college-card>
      </view>
      <!-- 可保底内容 -->
      <view v-show="current === 2">
         <college-card :canType="'保'" :bgc="'#5bc492'"></college-card>
      </view>
    </view>
           
  </view>
</template>

<script>
  export default {
    data() {
      return {
        filterTitle:[
          {name:'地区'},
          {name:'类型'},
          {name:'专业'},
          {name:'查询范围'},
        ],
        items: ['可冲击56', '较稳妥44', '可保底17'],
        current: 0,
        isChecked:false,
        activeindex:null,
      };
    },
    methods:{
     onClickItem(e) {
        if (this.current != e.currentIndex) {
          this.current = e.currentIndex;
        }
      },
      radioClick(){
        this.isChecked = !this.isChecked
      }
    }
  }
</script>

<style scoped lang="scss">
.stick-box{
  position: sticky;
  top: 0px;
  z-index: 2;
  background-color: #fff;
}

.content{
  background-color: #f8f8f8;
  
}
</style>
