<template>
  <view>
    <view class="stick-box" style="height: 360px;">
      <view class="college_list-box">
        <!-- 搜索框区域 -->
        <view class="my-search-box">
          <view class="search">
            <!-- 基本用法 -->
            <uni-search-bar placeholder="搜索院校" :cancelButton="true" @confirm="search" @input="input" radius="100" ></uni-search-bar>
          </view>
        </view>
        <!-- 能上的大学，适合的专业 -->
        <view class="college_major">
          <view class="canCollege-box">
            <!-- 能上的大学 -->
            <view class="canCollege">
              <!-- 图标 -->
              <view class="cancollege-img">
                <image src="/static/images/canCollege.png" mode="widthFix"></image>
              </view>
              <!-- 文字 -->
              <view class="cancollege-text">
                <view class="cancollege-text-top">
                  <text>能上的大学</text>
                </view>
                <view class="cancollege-text-bottom">
                  <text>智能模拟填报</text>
                </view>
              </view>
            </view> 
            <!-- 适合的专业 -->
            <view class="canCollege">
              <!-- 图标 -->
              <view class="cancollege-img">
                <image src="/static/images/fitMajor.png" mode="widthFix"></image>
              </view>
              <!-- 文字 -->
              <view class="cancollege-text">
                <view class="cancollege-text-top">
                  <text>适合的专业</text>
                </view>
                <view class="cancollege-text-bottom">
                  <text>权威评测一键知悉</text>
                </view>
              </view>
            </view> 
          </view>
             
        </view>
        <!-- 地区、学历级别、高校级别等筛选区域 -->
        <view class="filter-box" >
          <view class="filter-text" v-for="(item,i) in filterTitle" :key="i"  @click="activeFilterTitle(i)" >
            <text :class="{active:activeindex == i & filterActive}">{{item.name}}</text>
            <uni-icons type="bottom" size="13"></uni-icons>
          </view>
        </view>
        <!-- 过滤信息展开区域 -->
        <view class="filter-expand" v-if="filterActive">
          <scroll-view scroll-y="true" style="height: 160px;">
            <view class="filter-list">
              <view v-for="(item,index) in filterConten" :key="index" class="filter-item">{{item}}</view>
            </view>
          </scroll-view>
          <!-- 重置和确认按钮 -->
          <view class="btn-reset-confirm">
            <button>重置</button>
            <button class="confirm-btn">确定</button>
          </view>
        </view>
        <!-- 大学列表标题区域 -->
        <view class="collegeName-title">
          <view class="">
            院校名称
          </view>
          <view class="">
            录取最低分/位次
          </view>
        </view>
      </view>
    </view>
    <!-- 大学列表展示 -->
    <view class="scroll-college">
       <view class="college-item" v-for="(item,i) in collegeListT" :key="i">
          <my-college-item :college="item"></my-college-item>
        </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        activeindex:null,
        filterActive:false,
        filterTitle:[
          {name:'地区'},
          {name:'学历级别'},
          {name:'高校级别'},
          {name:'类型'},
        ],
        filterConten:['澳门','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港'],
        queryObj:{
          page:1,
          infScore:10,
        },
        total:0,
        collegeListT:[],
      };
    },
    onReady() {
      this.getCollegeList()
    },
    methods:{
      activeFilterTitle(index){
        this.activeindex = index
        this.filterActive = !this.filterActive
      },
      getCollegeList(){
        uni.request({
          url:`https://www.zytb.top/NEMT/gk/schoolApp/findSchool2?page=${this.queryObj.page}&infScore${this.queryObj.infScore}`,
          method:'POST',
          data:{},
          success: (res)=>{
            console.log(res)
            this.collegeListT = [...this.collegeListT,...res.data.data.list]
            this.total = res.data.data.total
          }
        })
      },
    },
    //触底的事件
    onReachBottom() {
      //让页码值自增+1
      this.queryObj.page += 1
      //重新获取列表数据
      this.getCollegeList()
    }
  }
</script>

<style lang="scss">
.stick-box{
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fff;
  
}
.college_list-box{
  position: relative;
  .my-search-box{
    height: 200px;
    background-color: #ef8467;
    display: flex;
    align-items: center;
    .search{
      width: 100%;
      
    }
  }
  .college_major{
    display: flex;
    justify-content: center;
    position: relative;
    transform: translateY(-50%);
    box-shadow: 1px 5px 10px #f7f7f7;
    height: 100px;
    .canCollege-box{
      display: flex;
      width: 90%;
      background-color: #fff;
      border-radius: 10px;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      .canCollege{
        display: flex;
        align-items: center;
        .cancollege-img{
          margin-right: 10px;
          image{
            width: 30px;
            height: 30px;
          }
        }
        .cancollege-text{
          display: flex;
          flex-direction: column;
          .cancollege-text-top{
            font-size: 20px;
            text-align: center;
          }
          .cancollege-text-bottom{
            color: #999999;
          }
        }
      }
    }
    
  }
  .filter-box{
    background-color: #f7f7f7;
    height: 70px;
    display: flex;
    justify-content: space-around;
    position: relative;
    top: -48px;
    
    .filter-text{
      display: flex;
      align-items: center;
      text{
        display: block;
        color: #666666;
        margin-right: 5px;
      }
      .active{
      color:#ef845e;
    }
    }
  }
  .filter-expand{
    position: absolute;
    top: 326px;
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
  
  .collegeName-title{
    display: flex;
    position: relative;
    top: -50px;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    justify-content: space-between;
  }
}
.scroll-college{
    position: relative;
    top: -50px;
    z-index: 0;
    margin-top: 55px;
  }
</style>
