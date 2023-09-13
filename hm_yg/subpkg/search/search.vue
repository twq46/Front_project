<template>
  <view>
    <view class="search-box">
     <uni-search-bar @input="inputHandler" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
    </view>
    
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchList.length > 0">
      <view class="sugg-item" v-for="(item,i) in searchList" :key="i" @click="gotoDetail(item)">
        <view class="goods_name">
          {{item.goods_name}}
        </view>  
        <uni-icons type="forward" size="16"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="hisstory-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="deleteHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="hisstory-list">
        <uni-tag :text="item" v-for="(item, i) in histories" :key="i" class="unitag" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        searchList:[],
        historyList:[]
      };
    },
    onLoad(){
      //拿到strage中存储的搜索历史记录
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods:{
      inputHandler(e){
        //搜索框的防抖
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          // console.log(e)
          this.kw = e
          this.getSearchList()
        },500)
        
      },
      async getSearchList(){
        if(this.kw.length === 0){
          this.searchList = []
          return
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
        if(res.meta.status !==200) return uni.$showMsg()
        this.searchList = res.message
        this.saveSearchHistory()
      },
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory(){
        // this.historyList.push(this.kw)
        //去除重复的
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        //将set转化为array
        this.historyList = Array.from(set)
        //将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      deleteHistory(){
        this.historyList = []
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + item
        })
      }
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: 0;
  z-index: 2;
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom:1px solid #efefef ;
    .goods_name{
      white-space: nowrap;
      overflow: hidden;
      //溢出部分显示三个点
      text-overflow: ellipsis;
    }
  }
}
.history-box{
  padding: 0 5px;
  .hisstory-title{
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .hisstory-list{
    display: flex;
    flex-wrap: wrap;
    .unitag{
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
