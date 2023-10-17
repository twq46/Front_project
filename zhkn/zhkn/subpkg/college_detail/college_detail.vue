<template>
  <view v-if="schoolDetail.schoolName">
    <!-- 图标，学校名，学校类型 -->
    <view class="college-box">
      <view class="college-info">
        <!-- 图标 -->
        <view class="logo">
          <image :src="schoolDetail.logo" mode=""></image>
        </view>
        <view class="name">
          <view class="schoolname">
            {{schoolDetail.schoolName}}
          </view>
          <view class="type">
            {{showType}}
          </view>
        </view>
      </view>
    </view>
    <!-- 简介、录取分数、 招生计划-->
    <view class="stick-box">
      <view class="stick-info">
        <view class="stick-item"  v-for="(item ,i) in stickScore" :key="i">
          <view :class="{active:activeIndex === i}" class="stick-text" @click="stickClick(i)">{{item}}</view>
        </view>
      </view>
    </view>
    <!-- 校园介绍 -->
    <view class="introduce-box">
     <view class="introduce-title">
       校园介绍
     </view>
     <view class="introduce-text" :class="{overflowActive:flag}">
       <rich-text :nodes="schoolDetail.summary"></rich-text>
     </view>
     <view class="more" @click="showTag">{{flag ? "收起" : "查看全部"}}</view>
    </view>
    <!-- 求学价值 -->
    <view class="study-value">
      <view class="title">
        求学价值
      </view>
      <view class="study-list">
        <view class="studyValue-item" v-for="(item,i) in studyValue" :key="i">
          <view class="number">
            {{item.value}}
          </view>
          <view class="text">
            {{item.name}}
          </view>
        </view>
      </view>
      
    </view>
    
    <!-- 录取分数线 -->
    <view class="score-plan-box">
        <!-- 筛选条件 -->
        <view class="filter-data">
          <!-- 录取分数，招生计划 -->
          <view class="text">
            <view class="data-item" :class="{scorePlanactive:scorePlanIndex===i}" v-for="(item,i) in scorePlan" :key="i" @click="scorePlanClick(i)">{{item}}</view>
          </view>
          <!-- 省份和年份下拉框 -->
          <view class="select">
            <!-- 省份 -->
            <view class="province-select">
                <uni-data-select
                  v-model="provinceValue"
                  :localdata="provinceList"
                  :clear="false"
                  @change="changeProvince"
                ></uni-data-select>
            </view>
            <!-- 年份 -->
            <view class="year-select">
                <uni-data-select
                  v-model="yearValue"
                  :localdata="yearList"
                  :clear="false"
                  @change="changeYear"
                ></uni-data-select>
            </view>
          </view>
        </view>
        <!-- 表格数据 -->
    		<view class="uni-container">
    			<uni-table ref="table" :loading="loading" border stripe  emptyText="暂无更多数据" @selection-change="selectionChange">
    				<uni-tr>
    					<uni-th width="70" align="center">{{scoreIsSelected ? '文/理科' :'批次/段'}}</uni-th>
    					<uni-th width="150" align="center">专业名称</uni-th>
    					<uni-th align="center" width="60">{{scoreIsSelected ? '录取分数' :'招生人数'}}</uni-th>
    					<uni-th width="60" align="center">{{scoreIsSelected ? '最低位次' :'选科要求'}}</uni-th>
    				</uni-tr>
    				<uni-tr v-for="(item, index) in showScorePlanList" :key="index">
    					<uni-td align="center">{{scoreIsSelected ? item.typeString : item.batch}}</uni-td>
    					<uni-td align="center">{{item.majorName}}</uni-td>
    					<uni-td align="center">{{scoreIsSelected ? item.enrollScore : item.enrollNum
}}</uni-td>
    					<uni-td align="center">{{scoreIsSelected ? item.rank : item.selectSubject
}}</uni-td>
    				</uni-tr>
    			</uni-table>
    		</view>
    	</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        schoolDetail:{},
        studyValue:[],
        activeIndex:0,
        flag:false,
        //默认选中的录取分数
        scoreIsSelected:true,
        provinceValue:2,
        yearValue:3,
        scorePlanIndex:0,
        enrollScoreList:[],
        enrollPalnList:[],
        enrollScoreQuery:{
          city:'辽宁',
          schoolName:'',
          year:2022
        },
        enrollPlanQuery:{
          province:'辽宁',
          schoolName:'',
          year:2022
        },
        stickScore:['简介','录取分数','招生计划'],
        scorePlan:['录取分数','招生计划'],
        provinceList:[{value:0,text:"河北"},{value:1,text:"山东"},{value:2,text:"辽宁"}],
        yearList:[
          {value:0,text:"2019"},{value:1,text:"2020"},{value:2,text:"2021"},{value:3,text:"2022"},{value:3,text:"2023"}
        ],
      };
    },
    onLoad(option) {
      this.enrollScoreQuery.schoolName = option.schoolName
      this.enrollPlanQuery.schoolName = option.schoolName
      this.getSchoolDetailData(option.schoolName)
      this.getenrollScoreData(this.enrollScoreQuery)
      this.getenrollPlanData(this.enrollPlanQuery)
    },
    computed:{
      showType(){
        let schoolinfo = this.schoolDetail.province + '  ' + this.schoolDetail.city + '  ' + this.schoolDetail.ifGovernment + '  ' + this.schoolDetail.category
        if(this.schoolDetail.tags.length > 0){
          schoolinfo = schoolinfo + '  ' + this.schoolDetail.tags[0]
          if(this.schoolDetail.tags.length > 1){
            schoolinfo = schoolinfo + '  ' + this.schoolDetail.tags[1]
          }
        }
        return schoolinfo
      },
      showScorePlanList(){
        if(this.scoreIsSelected) return this.enrollScoreList
        return this.enrollPalnList
      }
    },
    methods:{
      //获取学校基本信息
      getSchoolDetailData(schoolName){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/schoolApp/getSchoolDetails2',
          method:'GET',
          data:{schoolName:schoolName},
          success: (res) => {
            this.schoolDetail = res.data.data.schoolDetail
            this.studyValue = [
              {name:'硕士点',value:this.schoolDetail.masterPoint},
              {name:'博士点',value:this.schoolDetail.doctorPoint},
              {name:'校友会',value:this.schoolDetail.alumniRanking},
              {name:'武书连',value:this.schoolDetail.wslRanking},
              {name:'国家重点学科',value:this.schoolDetail.nationalCount},
              {name:'科研项目',value:this.schoolDetail.researchProject},
            ]
          }
        })
      },
      //获取录取分数
      getenrollScoreData(query){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/enrollScore/enrollScoreBySchoolName2',
          method:'GET',
          data:query,
          success: (res) => {
            this.enrollScoreList = res.data.data
          }
        })
      },
      //获取招生计划数据
      getenrollPlanData(query){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/enrollPlan/enrollPlanBySchoolName',
          method:'GET',
          data:query,
          success: (res) => {
            this.enrollPalnList = res.data.data
          }
        })
      },
      stickClick(index){
        this.activeIndex = index
      },
      showTag(){
        this.flag = !this.flag
      },
      //当前选中的是录取分数还是招生计划
      scorePlanClick(index){
        this.scorePlanIndex = index
        if(index === 0){
          this.scoreIsSelected = true
        }else{
          this.scoreIsSelected = false
        }
      },
      //省份改变
      changeProvince(index){
        this.enrollScoreQuery.city = this.provinceList[index].text
        this.enrollPlanQuery.province = this.provinceList[index].text
        this.getenrollScoreData( this.enrollScoreQuery)
        this.getenrollPlanData( this.enrollPlanQuery)
      },
      //年份改变
      changeYear(index){
        this.enrollScoreQuery.year = this.yearList[index].text
        this.enrollPlanQuery.year = this.yearList[index].text
        this.getenrollScoreData( this.enrollScoreQuery)
        this.getenrollPlanData( this.enrollPlanQuery)
        console.log(this.yearList[index].text)
      }
    }
  }
</script>

<style scoped lang="scss">
.college-box{
  background-color: #ee8367;
  height: 140px;
  display: flex;
  align-items: center;
  .college-info{
    display: flex;
    align-items: center;
    margin-left: 20px;
    .logo{
      margin-right: 10px;
      border-radius: 5px;
      image{
        border-radius: 5px;
        width: 50px;
        height: 50px;
      }
    }
    .name{
      color: white;
      .type{
        font-size: 12px;
      }
      
    }
  }
}

.stick-box{
  background-color: white;
  box-shadow: 1px 5px 5px #eee;
  height: 40px;
  //吸顶效果
  position: -webkit-sticky;
  position: sticky;
  top: var(--window-top);
  z-index: 99;
  .stick-info{
    display: flex;
    line-height: 40px;
    justify-content: space-around;
    .stick-text{
      height: 80%;
    }
    .active{
        color:#ed6c4a;
        border-bottom: 1px solid #ed6c4a;
    }
  }
}

.introduce-box{
  margin-top: 5px;
  box-shadow: 1px 5px 5px #eee;
  .introduce-title{
    font-weight: bold;
    padding: 10px;
  }
  .introduce-text{
    padding: 0 10px;
    height: 180rpx;
    overflow: hidden;
  }
  .overflowActive{
    height:auto;
    overflow: visible;
  }
  .more{
    text-align: center;
    font-size: 15px;
    color: #ed6c4a;
  }
}

.study-value{
  box-shadow: 1px 5px 5px #eee;
  padding: 10px;
  .title{
    margin: 10px 0;
  }
  .study-list{
    display: flex;
    flex-wrap: wrap;
    .studyValue-item{
      background-color: #fdf6f4;
      margin: 3px;
      width: 80px;
      height: 80px;
      .number{
        margin-top: 10px;
        text-align: center;
        font-size: 25px;
        color:#ed6c4a;
        font-weight: bold;
      }
      .text{
        color:#666666;
        font-size: 13px;
        text-align: center;
      }
    }
  }
  
}

.score-plan-box{
  
  .filter-data{
    padding: 10px;
    display: flex;
    align-items: center;
    .text{
      display: flex;
      .data-item{
        margin-right: 10px;
        font-size: 14px;
      }
      .scorePlanactive{
        color:#ed6c4a;
      }
    }
    .select{
      display: flex;
      .province-select{
        margin-right: 10px;
      }
    }
  }
  .uni-container{
    padding: 10px;
  }
}



</style>
