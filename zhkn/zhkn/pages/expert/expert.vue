<template>
  <view>
    <view class="topimg">
      <image src="../../static/expertTop.png" mode="widthFix"></image>
    </view>
    <view class="expert-list">
      <view class="expert-title">
        <view class="title">
          推荐专家
        </view>
        <view class="filter-title" @click="openExpertFilter">
          筛选<uni-icons type="settings-filled" size="18"  color="#9a9a9a"></uni-icons>
        </view>
      </view>
      <view class="list" v-for="(item, i) in teacherList" :key="i" @click="gotoTeacherDetail(item)">
        <my-expert-item :expert-detail="item"></my-expert-item>
      </view>
    </view>
    <!-- 专家指导介绍 -->
    <view class="image1">
      <image src="../../static/expert1.png" mode="widthFix"></image>
      <image src="../../static/expert2.png" mode="widthFix"></image>
      <image src="../../static/expert3.png" mode=""></image>
    </view>
    <uni-popup ref="expertPopup" type="bottom" background-color="white">
      <view class="filter-box">
        <view class="title">
          筛选条件
        </view>
        <view class="servetype">
          服务类型
        </view>
        <view class="servertype-list">
          <view class="serve-item" :class="{expertTagActive:currenIndex === index}" @click="serverTypeClick(index)"  v-for="(item,index) in expertTagList" :key="index">
            {{item.labelName}}
          </view>
        </view>
        
      </view>
      
      <!-- 重置和确认按钮 -->
      <view class="confirm-rest">
        <view class="rest" @click="restbtn">
          重置
        </view>
        <view class="confirm" @click="confirmbtn">
          确认
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        query:{
          pageNum:1,
          pageSize:10,
        },
        teacherList:[],
        expertTagList:[],
        currenIndex:null,
        lablesid:null,
      };
    },
    onLoad() {
      this.getTeacherList()
      this.getExpertFilterTag()
    },
    methods:{
      serverTypeClick(index){
        this.currenIndex = index
        if(index == 0){
          this.lablesid = 2
        }else if(index == 1){
          this.lablesid = 3
        }else{
          this.lablesid = 4
        }
      },
      restbtn(){
        this.currenIndex = null
        this.getTeacherList()
        this.$refs.expertPopup.close()
      },
      async confirmbtn(){
        let query = {
          labelIds:this.lablesid
        }
        const {data:res} = await uni.$http.get('/testExpert/findExpertInfoByLabelIds',query)
        if(res.code == 200){
          this.teacherList = res.data
          this.$refs.expertPopup.close()
        }
      },
      async getExpertFilterTag(){
        const {data:res} = await uni.$http.get('/label/list')
        this.expertTagList = res.rows
        
      },
      openExpertFilter(){
        this.$refs.expertPopup.open('bottom')
      },
      async getTeacherList(){
        const res = await uni.$http.get('/testExpert/listExpert',this.query)
        this.teacherList = res.data.data
      },
      //跳转到教师详情界面
      gotoTeacherDetail(teacherInfo){
        let teacherObject = JSON.stringify(teacherInfo)
        uni.navigateTo({
          url:'/subpkg/teacher-detail/teacher-detail?teacherInfo='+teacherObject
        })
      },
    }
  }
</script>

<style scoped lang="scss">
.topimg{
  image{
    width: 100%;
    height: 60%;
  }
}
.expert-list{
  position: relative;
  top: -20px;
  background-color: #fff;
  padding: 10px;
  border-radius: 15px 15px 0 0;
  .expert-title{
    display: flex;
    justify-content: space-between;
    .filter-title{
      display: flex;
      align-items: center;
      color: #9a9a9a;
      font-size: 14px;
    }
    .title{
      font-weight: bold;
    }
    
  }
}
.image1{
  image{
    width: 100%;
  }
  
}

.filter-box{
  padding: 0 10px;
  margin-bottom: 20px;
  .title{
    padding: 10px 0 30px 0;
    text-align: center;
  }
  .servetype{
    color:#0b0b0b;
    font-size: 14px;
  }
  .servertype-list{
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    .serve-item{
      margin-right: 10px;
      color: #393939;
      padding: 5px 15px;
      font-size: 14px;
      border-radius: 5px;
      border: 1px solid #ebebeb;
    }
    .expertTagActive{
      color: #fff;
      background-color: #df8967;
    }
  }
}
.confirm-rest{
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  background-color: #fff;
  .rest{
    padding: 10px 80px;
    border-radius: 30px;
    border: 1px solid  #ebebeb;
  }
  .confirm{
    padding: 10px 80px;
    border-radius: 30px;
    color: #fff;
    background-color: #df865f;
  }
}
</style>
