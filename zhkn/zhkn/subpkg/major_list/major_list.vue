<template>
  <view>
    <view class="stick-box">
      <view class="nav-box">
        <view class="search-box">
          <uni-search-bar radius="20" cancelButton="none" placeholder="请输入你要查找的专业" bgColor="#fff" @input="inputMajor"></uni-search-bar>
        </view>
      </view>
      <!-- 过滤数据区域 -->
      <view class="filter-box">
        <my-filterData 
        :filter-title="filterTitle" 
        :font-size="'12px'" 
        :cologe-level="cologeLevel"
        :subject-class-title="subjectClassTitle"
        @batchFilterItem="batchFilterItem"
        @subjuectFilterItem="subjuectFilterItem"
        @confirm="confirm" 
        @restSubtypeClick="restSubtypeClick"></my-filterData>
      </view>
      <!-- 专业名称标题 -->
     <!-- <view class="title">
        专业名称
      </view> -->
    </view>
    
    <!-- 专业列表 -->
    <view class="major-box">
      <view class="major-list" v-for="(item,i) in subjectClassList" :key="i">
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
        timer:null,
        filterTitle:[
          {name:'院校批次'},
          {name:'学科门类'},
        ],
        subjectClassList:[],
        subjectClassTitle:[],
        majorBigClassList:[],
        generaList:'',
        category:'全部',
        batch:'',
        cologeLevel:['本科','专科'],
      };
    },
    onLoad() {
      this.getsubjectClassData()
      this.getSubjectClassTitleData()
    },
    
    methods:{
      restSubtypeClick(){
        this.category = '全部',
        this.getsubjectClassData()
      },
      //输入款搜索专业
      inputMajor(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          this.generaList = e
          this.getGenerListData()
        },500)
      },
      //根据输入框的专业查找对应的专业
      getGenerListData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/majorApp/getMajorByLists',
          method:'GET',
          data:{generaList:this.generaList},
          success: (res) => {
            // console.log(res)
            this.subjectClassList = res.data.data.majorTypeList
          }
        })
      },
      //获取所有专业
      getsubjectClassData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/majorApp/findMajorByCategory2',
          method:'GET',
          data:{
            batch:this.batch,
            category:this.category
          },
          success: (res) => {
            // console.log(res)
            this.subjectClassList = res.data.data.majorTypeList
          }
        })
      },
      //获取学科门类标题数据
      getSubjectClassTitleData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/majorApp/findCategory',
          method:'GET',
          data:{batch:this.batch},
          success: (res) => {
            this.subjectClassTitle = res.data.data
          }
        })
      },
  
      //根据院校批次修改学科门类数据
      batchFilterItem(itemname){
        this.batch = itemname
        this.getSubjectClassTitleData()
      },
      //根据点击了学科门类的中某一项
      subjuectFilterItem(itemname){
        this.category = itemname
      },
      //点击了过滤中的确认按钮
      confirm(){
        this.getsubjectClassData()
      },
      //跳转到查看专业大类下的专业类别页面
      gotomajorDetail(major,titlename){
        uni.navigateTo({
          url:'/subpkg/major-categorylist/major-categorylist?major=' + JSON.stringify(major) +'&titlename=' + titlename
        });
      }
    
    },
    
  }
</script>

<style scoped lang="scss">
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
