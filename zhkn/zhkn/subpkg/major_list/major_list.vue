<template>
  <view>
    <view class="stick-box">
      <view class="nav-box">
        <view class="search-box">
          <uni-search-bar radius="20" cancelButton="none" placeholder="请输入你要查找的专业" bgColor="#fff"></uni-search-bar>
        </view>
      </view>
      <!-- 过滤数据区域 -->
      <view class="filter-box">
        <my-filterData :filter-title="filterTitle" :font-size="'12px'"></my-filterData>
      </view>
      <!-- 专业名称标题 -->
     <!-- <view class="title">
        专业名称
      </view> -->
    </view>
    
    <!-- 专业列表 -->
    <view class="major-box">
      <view class="major-list" v-for="(item,i) in subjectClass" :key="i">
       <view class="major-item" @click="gotomajorDetail(item.major,item.majorType)">
        <view class="major-title">
         <view class="major-name">
           {{item.majorType}}
         </view>
         <view class="major-number">
           {{item.size}}个专业 >
         </view>
        </view>
       </view>
      </view>
    </view>
   
  </view>
</template>

<script>
  export default {
    data() {
      return {
        filterTitle:[
          {name:'院校批次'},
          {name:'学科门类'},
        ],
        subjectClass:[],
        bigMajorList:[],
        category:'全部'
      };
    },
    onLoad() {
      this.getsubjectClassData()
    },
    methods:{
      getsubjectClassData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/majorApp/findMajorByCategory2',
          method:'GET',
          data:{
            category:this.category
          },
          success: (res) => {
            // console.log(res)
            this.subjectClass = res.data.data.majorTypeList
          }
        })
      },
      gotomajorDetail(major,titlename){
        uni.navigateTo({
          url:'/subpkg/major-categorylist/major-categorylist?major=' + JSON.stringify(major) +'&titlename=' + titlename
        });
      }
    },
    
  }
</script>

<style lang="scss">
.stick-box{
  position: sticky;
  top: 0px;
  left: 0px;
  .nav-box{
    background-color: #ed7064;
    height: 100px;
    display: flex;
    align-items: center;
    .search-box{
      width: 100%;
    }
  }
  .filter-box{
    background-color: #f7f7f7;
  }
  .title{
    padding-left: 8px;
    margin: 6px 0;
  }
}
.major-box{
  .major-list{
    padding: 10px 20px;
    .major-item{
      .major-title{
        display: flex;
        justify-content: space-between;
        .major-name{
          font-weight: bold;
        }
        .major-number{
          font-size: 13px;
          color: #b3b3b3;
        }
      }
      
    }
  }
}

</style>
