<template>
  <view>
    <view class="imageTop">
      <image src="../../static/volunteer.png" mode="widthFix"></image>
    </view>
    
    <view class="dztBox">
      <view v-if="userinfo.score" @click="editScoreHandle">{{userinfo.examProvince}} {{userinfo.score}}分 {{userinfo.physics == 1 ? '物':''}} {{userinfo.chemistry == 1 ? '化':''}} {{userinfo.biology == 1 ? '生':''}} {{userinfo.politics == 1 ? '政':''}} {{userinfo.history == 1 ? '历':''}} {{userinfo.geography == 1 ? '地':''}} {{userinfo.rank}}名 <uni-icons type="compose" size="20" class="edit-icon" color="#f09162"></uni-icons></view>
      <view v-else @click="editScoreHandle">成绩：添加成绩信息<uni-icons type="compose" size="20" class="edit-icon" color="#f09162"></uni-icons></view>
    </view>
    
    <!-- 模拟填报和一键分析志愿表 -->
    <view class="monianlyse">
      <!-- 模拟填报 -->
      <view class="mntb">
        <!-- 图标 -->
        <view class="mnlogo">
          <image src="../../static/images/moni.png" mode=""></image>
          <!-- 上下标题和具体信息 -->
          <view class="mninfo">
            <view class="title">
              模拟填报
            </view>
            <view class="detailinfo">
              本科第一批 超出批次线41分
            </view>
          </view>
        </view>
        
        <!-- 按钮区 -->
        <view class="zntbutton" @click="gotozntian">
          智能填报
        </view>
      </view>
      
      <!-- 分析志愿表 -->
      <view class="mntb">
        <!-- 图标 -->
        <view class="mnlogo">
          <image src="../../static/images/anylsevolunteer.png" mode=""></image>
          <!-- 上下标题和具体信息 -->
          <view class="mninfo">
            <view class="title">
              一键分析志愿表
            </view>
            <view class="detailinfo">
              志愿风险先知道
            </view>
          </view>
        </view>
        <!-- 按钮区 -->
        <view class="zntbutton">
          分析志愿表
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    methods:{
      editScoreHandle(){
        let currentinfo = JSON.stringify(this.userInfo)
        uni.navigateTo({
          url:'/subpkg/editScore/editScore?userinfo=' + currentinfo
        })
      },
      
      gotozntian(){
        uni.navigateTo({
          url:'/subpkg/intellingent_filling/intellingent_filling'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.imageTop{
  image{
    width: 100%;
  }
}
.dztBox{
    display: flex;
    justify-content: space-between;
    padding: 15px;
    width: 90%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 5px 15rpx #ddd;
    box-sizing: border-box;
    position: relative;
    left: 21px;
    top: -21px;
    height: 48px;
    font-weight: bold;
    font-size: 13px;
  }
.edit-icon{
  margin-left: 5px;
}
.monianlyse{
  padding: 0 20px;
  .mntb{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    justify-content: space-between;
    .mnlogo{
      display: flex;
      image{
        width: 35px;
        height: 40px;
      }
      .mninfo{
        margin-left: 15px;
        .title{
          font-size: 18px;
        }
        .detailinfo{
          color: #9a9a9a;
          font-size: 14px;
        }
      }
      
    }
    
    .zntbutton{
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color:#ff6657;
      border: 1px solid #ff6657;
      font-size: 15px;
      border-radius: 30px;
    }
  }
}
</style>
