<template>
  <view>
    <view class="user-box" >
      <!-- 个人信息 -->
      <view class="user-box-info">
        <!-- 用户图片信息 -->
        <view class="user-info">
          <view class="user-logo">
            <image :src="userinfo.avatarUrl" mode="widthFix"></image>
          </view>
          <view class="phone-number">
            <view class="number">
              {{userinfo.nickName}}
            </view>
            <view class="text">
              升级为VIP，准确查大学录取率
            </view>
          </view>
        </view>
        <!-- 用户的分数，能上的大学，志愿表 -->
        <view class="sore-infoDetail">
          <view class="user-score">
            <!-- 我的成绩 -->
            <view class="score-info">
              <view class="score-number">
                {{userinfo.score ? userinfo.score : 0}}分
              </view>
              <view class="score-text">
                我的成绩
              </view>
            </view>
          </view>
          
          <view class="user-score">
            <!-- 能上的大虚 -->
            <view class="score-info">
              <view class="score-number">
                0所
              </view>
              <view class="score-text">
                能上的大学
              </view>
            </view>
          </view>
          
          <view class="user-score">
            <!-- 能上的大虚 -->
            <view class="score-info">
              <view class="score-number">
                0份
              </view>
              <view class="score-text">
                志愿表
              </view>
            </view>
          </view>
          
        </view>
        
        <!-- vip栏目 -->
        <view class="vip-lanmu" @click="gotovip">
          
        </view>
      </view>
      
     <view class="my-count">
       <!-- 我的账户 -->
      <uni-card :is-shadow="false">
       <view class="title">
         我的账户
       </view>
       <view class="message-info">
        <view class="message-logo" >
          <image src="../../static/images/my-message.png" mode="widthFix"></image>
          <text>我的消息</text>
        </view>
       </view>
      </uni-card>
      <!-- 更多功能 -->
      <uni-card :is-shadow="false">
       <view class="title">
         更多功能
       </view>
       <view class="message-info more">
         <view class="message-logo" @click="gotoCollect">
           <image src="../../static/images/start.png" mode="widthFix"></image>
           <text>我的收藏</text>
         </view>
         <view class="message-logo" @click="gotoOrder">
           <image src="../../static/images/order.png" mode="widthFix"></image>
           <text>我的订单</text>
         </view>
         <view class="message-logo" @click="gotoabout">
           <image src="../../static/images/about.png" mode="widthFix" class="aboutimage"></image>
           <text>关于我们</text>
         </view>
       </view>
      </uni-card>
        
     </view>
    </view>
    
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:"my-userinfo",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    methods:{
      gotomymessage(){
        uni.navigateTo({
          url:'/subpkg/my-message/my-message'
        })
      },
      gotovip(){
        uni.switchTab({
          url:'/pages/vip/vip'
        })
      },
      gotoCollect(){
        uni.navigateTo({
          url:'/subpkg/my-collect/my-collect'
        })
      },
      gotoOrder(){
        uni.navigateTo({
          url:'/subpkg/my-order/my-order'
        })
      },
      gotoabout(){
        uni.navigateTo({
          url:'/subpkg/about-my/about-my'
        })
      },
    }
      
  }
</script>

<style scoped lang="scss">
.user-box{
  .user-box-info{
    height: 250px;
    background-color: #ee7c66;
    box-sizing: border-box;
    padding-top: 30px;
    padding-left: 10px;
    position: relative;
    .user-info{
      display: flex;
      image{
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      .phone-number{
        margin-left: 8px;
        color: white;
        .number{
          margin-bottom: 6px;
        }
        .text{
          font-size: 14px;
        }
      }
    }
    
    .sore-infoDetail{
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      .user-score{
        color: white;
        .score-info{
          .score-number{
            text-align: center;
            margin-bottom: 6px;
          }
        }
      }
    
    }
    
    .vip-lanmu{
      border-radius: 8px 8px 0 0;
      height: 45px;
      width: 90%;
      position: absolute;
      bottom: 0;
      left: 50%; /* 将元素的左边缘放在父容器的中心 */
      transform: translateX(-50%); /* 将元素的中心对齐到父容器的中心 */
      background: url('../../static/images/vipfloat.png') no-repeat;
      background-size: 100% 100%;
    }
    
  }
  

  .my-count{
    .title{
      font-weight: bold;
    }
    .message-info{
      display: flex;
      margin-top: 20px;
      .message-logo{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 5px;
        image{
          width: 30px;
          height: 34px;
        }
        .aboutimage{
          
        }
      }
    }
    
    .more{
      display: flex;
      justify-content: space-around;
    }
  }

}

</style>