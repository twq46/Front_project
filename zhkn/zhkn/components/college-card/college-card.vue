<template>
  <view v-if="schoolItem">
    <uni-card>
      <view class="college-box">
        <!-- 大学信息区域 -->
        <view class="college-info">
          <!-- 学校logo -->
          <view class="college-logo">
            <image :src="schoolItem.logoPath" mode="widthFix"></image>
          </view>
          <!-- 学校名称和类型 -->
          <view class="info-text">
            <view class="title-code">
               <text class="title-info">{{schoolItem.schoolName}}</text>
               <view class="code">
                 [招生代码{{schoolItem.schoolCode}}]
               </view>
            </view>
           
            <view class="info-type">
              <text v-for="(item,index) in schoolItem.addressTags" :key="index">{{item + ' '}} </text>
              <text v-for="(tagItem,tagIndex) in schoolItem.tags" :key="tagIndex">{{tagItem + ' '}}</text>
            </view>
            <!-- 招生人数，最低分 -->
            <view class="zsnumber-box">
              <!-- 招生人数 -->
              <view class="zsnumber">
                <!-- <text>23年招生人数  <text class="number"> 23</text></text> -->
              </view>
              <!-- 最低分 -->
              <view class="lower-score">
                <!-- <text>22年最低分 <text class="number"> 544</text></text> -->
              </view>
            </view>
            
            <!-- 符合专业的数量，服从调剂 -->
            <view class="accord-adjust">
              <view class="major">
                符合专业({{schoolItem.majors ? schoolItem.majors.length : 0}}) <uni-icons type="top" size="10" color="#ff5639"></uni-icons>
              </view>
            </view>
          </view>
          <!-- 冲的概率 -->
          <view class="sprint-probability" :style="{background: bgc}">
            <view class="sprint">
              {{canType}}
            </view>
            <view class="probability">
              32%
            </view>
          </view>
        </view>
        
        <!-- 专业区域 -->
        <view >
          <volunteer-major-item v-for="(majorItem,index) in schoolItem.majors" :key="index"  :wish-list-t="wishList" :major-item="majorItem" @getcwbData="getcwbData"></volunteer-major-item>
        </view>
      </view>
    </uni-card>
    
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:"my-reliable",
    props:{
      wishList:{
        type:Array,
      },
      canType:{
        type:String,
        default:'冲'
      },
      bgc:{
        type:String,
        default:'#ee7f58'
      },
      schoolItem:{
        type:Object,
        default:{}
      },
    },
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    data() {
      return {
        isShowTable:false,
        currentMajorName:'',
      };
    },
    methods:{
     getcwbData(){
       this.$emit('getcwbData')
     }
    },
  }
</script>

<style scoped lang="scss">
.college-box{
    .college-info{
      display: flex;
      justify-content: space-around;
      .college-logo{
        image{
          width: 50px;
          height: 50px;
        }
      }
      .info-text{
        .title-code{
          display: flex;
          .code{
            color: #579bf8;
            margin-left: 5px;
            font-size: 13px;
          }
          .title-info{
           font-weight: 800;
          }
        }
        
       .info-type{
         font-size: 10px;
       }
       .zsnumber-box{
         display: flex;
         justify-content: space-between;
         font-size: 11px;
         .number{
           margin-left: 4px;
           font-weight: 800;
         }
       }
      .accord-adjust{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        .major{
          text-align: center;
          width: 45%;
          border: 1px solid #ff5639;
          color: #ff5639;
          border-radius: 15px;
          padding: 3px 5px;
        }
        .adjust{
          .radio-size{
            transform: scale(0.7);
          }
        }
      }
      }
      .sprint-probability{
        color: #fff;
        width: 45px;
        height: 35px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px;
        .sprint{
          font-weight: 800;
        }
        .probability{
          font-size: 12px;
        }
      }
    }
    
   
  }

.table-box{
  .major-infoT{
    padding: 10px;
    font-size: 15px;
    color: #5f5f5f;
    .collegeNameT{
      margin-bottom: 5px;
    }
  }
}
</style>