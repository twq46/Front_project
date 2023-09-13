<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,i) in goodsList" :key="i" @click="gotoGoodsDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //请求参数对象
        queryObj:{
          //查询的关键词
          query:'',
          //商品分类Id
          cid:'',
          //页面值
          pagenum:1,
          //页码大小
          pagesize:10
        },
        goodsList:[],
        total:0,
        isLoading:false
      }
    },
    onLoad(options){
      // console.log(options)
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      console.log(this.queryObj)
      this.getGoodsList()
    },
    onReachBottom(){
      //如果当前正在请求数据，就不要在发送数据请求
      if(this.isLoading) return
     //数据加载完成
     if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total){
       return uni.$showMsg('数据加载完毕')
     }
     //让页码值自增加1
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    //下拉刷新
    onPullDownRefresh(){
      //重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      //重新发送数据请求
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    },
    methods: {
      async getGoodsList(cb){
        //开始请求数据
        this.isLoading = true
        //请求携带多个参数
       const {data:res} =await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
       // 只要数据请求完毕，就立即按需调用 cb 回调函数
       cb && cb()
       if(res.meta.status !== 200) return uni.$showMsg()
       this.goodsList = [...this.goodsList,...res.message.goods]
       this.total = res.message.total
       //数据请求完成
       this.isLoading = false
      },
      //点击商品列表跳转到商品详情界面
      gotoGoodsDetail(){
        uni.navigateTo({
          url:"/subpkg/goods_detail/goods_detail"
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
