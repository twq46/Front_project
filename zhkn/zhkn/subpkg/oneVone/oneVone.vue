<template>
  <view class="">
    <view class="filter-box">
      
      <!-- 省份 -->
      <view class="province flex-t">
        省份:
        <uni-data-select class="select"
        v-model="provinceValue"
        :localdata="province"
        :clear="true"
        @change="changeProvince"
        ></uni-data-select>
      </view>
      
      <!-- 年份 -->
      <view class="year flex-t">
        年份:
        <uni-data-select class="select"
        v-model="yearValue"
        :localdata="year"
        :clear="true"
        :disabled="provinceSelected"
        @change="changeYear"
        ></uni-data-select>
      </view>
      
      <!-- 文理科 -->
      <view class="wenlisubjec flex-t">
        文理科:
        <uni-data-select class="select"
        v-model="wenlikevalue"
        :localdata="wenlike"
        :disabled="yearSelected"
        @change="changewenli"
        ></uni-data-select>
      </view>
      <!-- 查询按钮 -->
      <view class="queryButton" @click="queryButtonClick">
        查询
      </view>
    </view>
    <!-- 一分一段表格数据 -->
    <view class="table-box">
      <uni-table border stripe emptyText="暂无更多数据" >
      	<!-- 表头行 -->
      	<uni-tr>
      		<uni-th align="center" width="60">省份</uni-th>
      		<uni-th align="center" width="50">年份</uni-th>
      		<uni-th align="center" width="70">文理科</uni-th>
          <uni-th align="center" width="50">分数</uni-th>
          <uni-th align="center" width="50">人数</uni-th>
          <uni-th align="center" width="80">累计人数</uni-th>
      	</uni-tr>
      	<!-- 表格数据行 -->
      	<uni-tr v-for="(item,i) in tableData" :key="i">
      		<uni-td align="center">{{item.city}}</uni-td>
      		<uni-td align="center">{{item.year}}</uni-td>
      		<uni-td align="center">{{item.subject}}</uni-td>
          <uni-td align="center">{{item.subscore}}</uni-td>
          <uni-td align="center">{{item.nownumber}}</uni-td>
          <uni-td align="center">{{item.sumnumber}}</uni-td>
      	</uni-tr>
      </uni-table>
    </view>
   <!-- 分页 -->
   <view class="pagination">
      <uni-section title="修改按钮文字" subTitle="使用 prev-text / next-text 属性修改按钮文字" type="line" padding>
      	<uni-pagination :total="total" title="标题文字" prev-text="前一页" next-text="后一页" @change="pageChange" />
      </uni-section>
   </view>
  
  </view>
 
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    data() {
      return {
        query:{
          province:'',
          year:'',
          subject:'',
          page:1
        },
        total:0,
        provinceSelected:true,
        yearSelected:true,
        provinceValue:'',
        yearValue:'',
        wenlikevalue:'',
        province:[],
        year:[],
        wenlike:[],
        tableData:[],
      };
    },
    onLoad() {
      this.getProvinceData()
      if(this.userinfo.examProvince == '山东'){
        this.provinceValue = 0
        this.query.province = this.userinfo.examProvince
        this.provinceSelected = false
        this.getYearData()
      }else if(this.userinfo.examProvince == '河北'){
        this.provinceValue = 1
       this.query.province = this.userinfo.examProvince
       this.provinceSelected = false
       this.getYearData()
      }else if(this.userinfo.examProvince == '辽宁'){
        this.provinceValue = 2
        this.query.province = this.userinfo.examProvince
        this.provinceSelected = false
        this.getYearData()
      }
    },
    
    methods:{
      getProvinceData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/extendPC/getSectionScoreProvince',
          method:'GET',
          success: (res) => {
            this.province = res.data.data.map((item,index)=>{
              return{
                value:index,
                text:item
              }
            })
          }
        })
      },
      //省份改变
      changeProvince(e){
        if(e === ''){
          this.provinceSelected = true
          this.yearSelected = true
          this.yearValue = ''
          this.wenlikevalue = ''
          this.total = 0
          this.tableData = []
        }else{
          this.provinceValue = e
          this.provinceSelected = false
          this.query.province = this.province[e].text
          this.getYearData()
        }
      },
      //年份改变
      changeYear(e){
        if(e === ''){
          this.yearSelected = true
          this.wenlikevalue = ''
          this.total = 0
          this.tableData = []
        }else{
          this.yearSelected = false
          this.query.province = this.province[this.provinceValue].text
          this.query.year = this.year[e].text
          this.getwenliData()
        }
      },
      //文理科改变
      changewenli(e){
        if(e === ''){
          this.total = 0
          this.tableData = []
        }else{
          this.query.subject = this.wenlike[e].text
        }
      },
      //当省份选中时获取年份的数据
      getYearData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/extendPC/getSectionScoreYear',
          method:'GET',
          data:{
            province:this.query.province
          },
          success: (res) => {
            this.year = res.data.data.map((item,index)=>{
              return {
                value:index,
                text:item
              }
              
            })
          }
        })
      },
      //当年份选中时获取文理科数据
      getwenliData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/extendPC/getSectionScoreSubject',
          method:'GET',
          data:{
            province:this.query.province,
            year:this.query.year
          },
          success: (res) => {
            this.wenlike = res.data.data.map((item,index)=>{
              return {
                value:index,
                text:item
              }
            })
          }
        })
      },
      //点击查询按钮
      queryButtonClick(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/extendPC/getSectionScorePC',
          method:'GET',
          data:this.query,
          success: (res) => {
            // console.log(res)
            this.tableData = res.data.data
            this.total = res.data.total
          }
        })
      },
      pageChange(e){
        this.query.page = e.current
        this.queryButtonClick()
      }
    }
  }
</script>

<style scoped lang="scss">
.filter-box{
  padding: 3px;
  margin-top: 5px;
  font-size: 13px;
  display: flex;
  justify-content: space-around;
  .flex-t{
    display: flex;
    align-items: center;
  }
  .select{
    margin-left: 3px;
  }
  .queryButton{
    background-color: #ef8867;
    padding: 0 5px;
    display: flex;
    font-size: 12px;
    align-items: center;
    border-radius: 20%;
    text-align: center;
    color: white;
  }
}
.table-box{
  margin-top: 20px;
  padding: 5px;
}
.pagination{
  margin-top: 10px;
}
</style>
