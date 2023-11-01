<template>
  <view class="college_major">
    <!-- 录取率 -->
    <view class="admission-rate">
      录取率<text class="rate">32%</text>
    </view>
    <!-- 专业名 -->
    <view class="major-name">
      {{majorItem.majorName}}
    </view>
    <!-- 专业介绍 -->
    <!-- <view class="major-info">
      纺织工程(办学地点:博达校区;国家级一流本科专业)
    </view> -->
    <!-- 专业招生人数和加入资源按钮 -->
    <view class="zsnumber-add">
      <view class="zsnumber">
        {{majorItem.enrollYear}}年招生人数<text>{{majorItem.enrollNum}}</text>
      </view>
      <view class="addvolunteer" @click="addVolunteerTable(majorItem)" v-if="majorItem.flag === -1">
        + 加入志愿表
      </view>
      <view class="alreadyaddvolunteer" @click="addVolunteerTable(majorItem)" v-else>
        已加入
      </view>
    </view>
      <!-- 表格数据 -->
      <view class="table-box">
        <uni-table  stripe emptyText="暂无更多数据" class="table-bgc">
          <!-- 表头行 -->
          <uni-tr>
            <uni-th align="center" width="30" >年份</uni-th>
            <uni-th align="center" width="140">最低分/最低位次</uni-th>
            <uni-th align="center" width="65">录取数</uni-th>
          </uni-tr>
          <!-- 表格数据行 -->
          <uni-tr v-for="(enroItem,i) in enrollScores" :key="i">
            <uni-td align="center">{{enroItem.year}}</uni-td>
            <uni-td align="center">{{enroItem.lowscore}}/{{enroItem.lowPosition}}</uni-td>
            <uni-td align="center">{{enroItem.enrollNum}}</uni-td>
          </uni-tr>
        </uni-table>  
      </view>

    
    <!-- 底部选科要求和学费 -->
    <view class="chooseMajor">
      <view class="text">
        选科要求:<text class="text-info">{{majorItem.selectionRequirement}}</text>
      </view>
      <view class="price">
        学费:<text class="text-info">3500</text>
      </view>
    </view>
            
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:"volunteer-major-item",
    props:{
      majorItem:{
        type:Object,
        default:null,
      },
      wishListT:{
        type:Array,
      }
    },
    watch:{
      majorItem:{
        handler(newValue,oldValue){
          this.getTableData()
        },
        deep:true,
        immediate:true,
      }
    },
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    data() {
      return {
        
        enrollScores:[]
      };
    },
    methods:{
      async getTableData(){
        // this.$emit('getTableData',this.majorItem)
        const {data:majorRes} = await uni.$http.get(`/extendApp/getEnrollScores?id=${this.majorItem.id}`)
        this.enrollScores = majorRes.data.enrollScores
      },
      //添加志愿到表单里
      async addVolunteerTable(){
        //将志愿添加到表单里
        if(this.userinfo.vip !== 1){
          return uni.$showMsg('请先开通vip')
        }
        if(this.majorItem.flag == -1){
            const {data : res} = await uni.$http.post(`/wishWX/addWishToList?openId=${this.userinfo.openId}&wishId=${this.majorItem.wishId}&chance=${this.majorItem.risk}&mark=0`)
            if(res.data == '添加成功'){
              this.$emit('getcwbData')
              uni.$showMsg('添加成功！')
            }
        }else{
          const {data : res} = await uni.$http.delete(`/wishWX/cancelAddWishToList?openId=${this.userinfo.openId}&id=${this.majorItem.id}&mark=0`)
          if(res.msg == '操作成功'){
            this.$emit('getcwbData')
            uni.$showMsg('成功移除该志愿！')
          }
        }
      },
    }
  }
</script>

<style lang="scss">
 .college_major{
      background-color: #fffbfc;
      border: 1px solid #ffdbd5;
      margin-top: 10px;
      border-radius: 12px;
      position: relative;
      padding: 10px 5px;
      .admission-rate{
        position: absolute;
        top:0px;
        right: 0px;
        background-color: #fbe9e7;
        color: #e84a3b;
        padding: 5px;
        font-size: 11px;
        border-radius: 0 12px 0 12px;
      }
      .major-name{
        font-size: 15px;
        font-weight: bold;
      }
      .major-info{
        margin-top: 10px;
        font-size: 12px;
      }
      .zsnumber-add{
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        .zsnumber{
          margin-top: 10px;
          text{
            margin-left: 3px;
            font-weight: bold;
          }
        }
        .addvolunteer{
          border: 1px solid #ff5639;
          border-radius: 20px;
          padding: 5px;
          color: #ff5639;
          font-weight: bold;
          font-size: 13px;
        }
        .alreadyaddvolunteer{
          border: 1px solid #9d9d9e;
          background-color: #9d9d9e;
          border-radius: 20px;
          padding: 5px;
          color: #fff;
          font-weight: bold;
          font-size: 13px;
        }
      }
    
      .chooseMajor{
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        .text-info{
          margin-left: 5px;
          font-weight: bold;
        }
      }
    }
</style>