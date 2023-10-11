<template>
  <view>
    <uni-card>
      <view class="college-box">
        <!-- 大学信息区域 -->
        <view class="college-info">
          <!-- 学校logo -->
          <view class="college-logo">
            <image src="/static/college_testLogo.png" mode=""></image>
          </view>
          <!-- 学校名称和类型 -->
          <view class="info-text">
            <view class="title-code">
               <text class="title-info">新疆大学</text>
               <view class="code">
                 [招生代码2120]
               </view>
            </view>
           
            <view class="info-type">
              <text>新疆 乌鲁木齐 本科 综合 211 双一流 艺术 本科一批 排名155</text>
            </view>
            <!-- 招生人数，最低分 -->
            <view class="zsnumber-box">
              <!-- 招生人数 -->
              <view class="zsnumber">
                <text>23年招生人数  <text class="number"> 23</text></text>
              </view>
              <!-- 最低分 -->
              <view class="lower-score">
                <text>22年最低分 <text class="number"> 544</text></text>
              </view>
            </view>
            <!-- 符合专业的数量，服从调剂 -->
            <view class="accord-adjust">
              <view class="major">
                符合专业(3) <uni-icons type="top" size="10" color="#ff5639"></uni-icons>
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
        <view class="college_major">
          <!-- 录取率 -->
          <view class="admission-rate">
            录取率<text class="rate">32%</text>
          </view>
          <!-- 专业名 -->
          <view class="major-name">
            纺织工程
          </view>
          <!-- 专业介绍 -->
          <view class="major-info">
            纺织工程(办学地点:博达校区;国家级一流本科专业)
          </view>
          <!-- 专业招生人数和加入资源按钮 -->
          <view class="zsnumber-add">
            <view class="zsnumber">
              23年招生人数<text>11</text>
            </view>
            <view class="addvolunteer">
              + 加入志愿表
            </view>
          </view>
          
          <!-- 表格数据 -->
          <view class="table-box">
            <uni-table  stripe emptyText="暂无更多数据" class="table-bgc">
            	<!-- 表头行 -->
            	<uni-tr >
            		<uni-th align="center" width="30" >年份</uni-th>
            		<uni-th align="center" width="120">最低分</uni-th>
            		<uni-th align="center" width="140">最低位次</uni-th>
            	</uni-tr>
            	<!-- 表格数据行 -->
            	<uni-tr>
            		<uni-td align="center">2020</uni-td>
            		<uni-td align="center">546</uni-td>
            		<uni-td align="center">64280</uni-td>
            	</uni-tr>
              <uni-tr>
              	<uni-td align="center">2021</uni-td>
              	<uni-td align="center">546</uni-td>
              	<uni-td align="center">64280</uni-td>
              </uni-tr>
            </uni-table>  
                        
          </view>
          <!-- 底部选科要求和学费 -->
          <view class="chooseMajor">
            <view class="text">
              选科要求:<text class="text-info">null</text>
            </view>
            <view class="price">
              学费:<text class="text-info">3500</text>
            </view>
          </view>
        </view>
      
        <view class="college_major">
          <!-- 录取率 -->
          <view class="admission-rate">
            录取率<text class="rate">32%</text>
          </view>
          <!-- 专业名 -->
          <view class="major-name">
            纺织工程
          </view>
          <!-- 专业介绍 -->
          <view class="major-info">
            纺织工程(办学地点:博达校区;国家级一流本科专业)
          </view>
          <!-- 专业招生人数和加入资源按钮 -->
          <view class="zsnumber-add">
            <view class="zsnumber">
              23年招生人数<text>11</text>
            </view>
            <view class="addvolunteer">
              + 加入志愿表
            </view>
          </view>
          
          <!-- 表格数据 -->
          <view class="table-box">
            <uni-table  stripe emptyText="暂无更多数据" class="table-bgc">
            	<!-- 表头行 -->
            	<uni-tr >
            		<uni-th align="center" width="30" >年份</uni-th>
            		<uni-th align="center" width="120">最低分</uni-th>
            		<uni-th align="center" width="140">最低位次</uni-th>
            	</uni-tr>
            	<!-- 表格数据行 -->
            	<uni-tr>
            		<uni-td align="center">2020</uni-td>
            		<uni-td align="center">546</uni-td>
            		<uni-td align="center">64280</uni-td>
            	</uni-tr>
              <uni-tr>
              	<uni-td align="center">2021</uni-td>
              	<uni-td align="center">546</uni-td>
              	<uni-td align="center">64280</uni-td>
              </uni-tr>
            </uni-table>  
                        
          </view>
          <!-- 底部选科要求和学费 -->
          <view class="chooseMajor">
            <view class="text">
              选科要求:<text class="text-info">null</text>
            </view>
            <view class="price">
              学费:<text class="text-info">3500</text>
            </view>
          </view>
        </view>
                  
        
        
      </view>
    </uni-card>
    
  </view>
</template>

<script>
  export default {
    name:"my-reliable",
    props:{
      canType:{
        type:String,
        default:'冲'
      },
      bgc:{
        type:String,
        default:'#ee7f58'
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.college-box{
    .college-info{
      display: flex;
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
         font-size: 11px;
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
          padding: 3px 0;
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