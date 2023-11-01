<template>
  <view>
    <uni-card>
      <view class="college-box">
        <!-- 大学信息区域 -->
        <view class="college-info">
          <view class="logo-name">
            <!-- 学校logo -->
            <view class="college-logo">
              <image :src="item.logo" mode="widthFix"></image>
            </view>
            <!-- 学校名称和类型 -->
            <view class="info-text">
              <view class="title-code">
                 <text class="title-info">{{item.schoolName}}</text>
                 <view class="code">
                   [招生代码{{item.schoolCode}}]
                 </view>
              </view>
            </view>
          </view>
          <!-- 删除志愿图标 -->
          <view class="deleteIcon" @click="deleteVolunteer">
            <uni-icons type="trash" size="20" color="red"></uni-icons>
          </view>
          <!-- 冲的概率 -->
          <!-- <view class="sprint-probability" >
            <view class="sprint">
              {{item.chances}}
            </view>
            <view class="probability">
              32%
            </view>
          </view> -->
        </view>
        <!-- 专业区域 -->
        <view class="college_major">
          <!-- 录取率 -->
          <view class="admission-rate" :style="{background:showbgc}">
            {{item.chances}}<text class="rate">32%</text>
          </view>
          <!-- 专业名 -->
          <view class="major-name">
            {{item.majorName}}
          </view>
          <!-- 专业招生人数和加入志愿按钮 -->
          <view class="zsnumber-add">
            <view class="zsnumber">
              {{item.enrollYear}}年招生人数<text>{{item.enrollNum}}</text>
            </view>
            <view class="zsnumber">
              学制:{{item.studyYear}}
            </view>
          </view>
          <!-- 底部选科要求和学费 -->
          <view class="chooseMajor">
            <view class="text">
              选科要求:<text class="text-info">{{item.selectSubject}}</text>
            </view>
            <view class="price">
              学费:<text class="text-info">{{item.tuition}}</text>
            </view>
          </view>
        </view>
      </view>
    </uni-card>
  </view>
</template>

<script>
  export default {
    name:"volunteer-item",
    props:{
      item:{
        type:Object,
        default:null,
      }
    },
    computed:{
      showbgc(){
        if(this.item.chances == '冲'){
          return '#ee7f58'
        }else if(this.item.chances == '稳'){
          return '#5eabf8'
        }else{
          return '#5bc492'
        }
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      async deleteVolunteer(){
        this.$emit('deleteVolunteer',this.item)
      }
    }
  }
</script>

<style scoped lang="less">
.college-box{
    .college-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo-name{
        display: flex;
        align-items: center;
      }
      .college-logo{
        margin-right: 5px;
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
      
    }
    
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
        color: #fff;
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
  }
</style>