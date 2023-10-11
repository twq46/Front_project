<template>
  <view>
    <!-- 适合我的大学 -->
    <view class="Fcontent">
      <!-- 地址 -->
      <!-- <view></view> -->
      <!-- 适合我的大学 -->
      <view class="Cbox">
        <view class="CtextSize">
          <text class="Cnumber">0</text>
          <text>所</text>
        </view>
        <view class="CtextSize">适合我的大学</view>
      </view>
      <!-- 冲，稳，保 -->
      <view class="cwbox">
        <!-- 冲 -->
        <view  class="flexT">
          <text class="centerN">-</text>
          <text> 冲击推荐</text>
        </view>
        <!-- 稳 -->
        <view class="flexT">
          <text class="centerN">-</text>
          <text> 稳妥推荐</text>
        </view>
        <!-- 保 -->
        <view class="flexT">
          <text class="centerN">-</text>
          <text>保底推荐</text>
        </view>
      </view>
    </view>
    <!-- 登录 挑选大学 -->
    <view class="dtBox">
      <!-- 登录、智能填报 -->
      <view class="dztBox">
        <view @click="gotoLogin">登录 / 注册</view>
        <view>
          <button class="zntb" @click="gotozntb">智能填报</button>
        </view>
    
      </view>
      <!-- 挑大学，选专业... -->
      <view class="nav-list">
        <navigator class="nav-item"  v-for="(item,i) in navList" :key="i" :url="item.url">
          <image :src="item.image_src" class="nav-img" mode=""></image>
        </navigator>
      </view>
    </view>
    <!-- 1v1报考咨询 -->
    <view class="bkziBox">
      <!-- 头部 -->
      <view class="bkziheader">
        <view class="bkzi1v1">
          <image class="bkziimg" src="../../static/images/bkzi.png" mode=""></image>
          <text>1V1报考咨询</text>
        </view>
        <view class="bkzxmore" @click="gotoFindExpert">更多 ></view>
      </view>
      <!-- 教师列表 -->
      <view class="teacherBox">
        <scroll-view scroll-x="true" class="scrollviewT">
          <view class="classBox" v-for="(item,i) in teacherList" :key="i">
            <view class="classlist">
              <view class="teacherview">
                <image class="teacherImg" :src="item.avatar"></image>
                <text>{{item.tianbaoshiName}}</text>
                <image class="zitianbao" src="../../static/images/teacherbottomzytb.png"></image>
              </view>
            </view>
          </view>
          
        </scroll-view>
      </view>
      <!-- 快报 -->
      <view class="kbBox">
        <view class="kuaibaoBox">
          <view class="hottextView">
            <image class="hotimg" src="../../static/images/hot.png" mode=""></image>
            <text>快报</text>
          </view>
          <view class="Gmessage"><text>北京高考</text></view>
          <view class="right">
            >
          </view>
        </view>
      </view>
    </view>
    <!-- 推荐服务 -->
    
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        navList:[
          {
            "name":"挑大学",
            "image_src":"../../static/images/chooseCollege.png",
            "url":'/subpkg/college_list/college_list'
          },
          {
            "name":"选专业",
            "image_src":"../../static/images/chooseMajor.png",
            "url":'/subpkg/major_list/major_list'
          },
          {
            "name":"一分一段",
            "image_src":"../../static/images/one_to_one.png",
            "url":'/subpkg/oneVone/oneVone'
          },
          // {
          //   "name":"测录取率",
          //   "image_src":"../../static/images/testlq.png",
          //   "url":'/subpkg/test_rate/test_rate'
          // },
        ],
        teacherList:[],
        query:{
          pageNum:1,
          pageSize:10,
        }
      };
    },
    computed:{
      ...mapState('m_user',['token']),
    },
    onLoad() {
      this.getTeacherList()
    },
    methods:{
      async getTeacherList(){
        const res = await uni.$http.get('/testExpert/listExpert',this.query)
        this.teacherList = res.data.data
      },
      async gotoLogin(){
        const res = await uni.$http.post('https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=ACCESS_TOKEN')
        // uni.navigateTo({
        //   url:'/subpkg/my-login/my-login'
        // })
      },
      gotozntb(){
        uni.navigateTo({
          url:'/subpkg/intellingent_filling/intellingent_filling'
        })
      },
      gotoFindExpert(){
        uni.switchTab({
          url:'/pages/expert/expert'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.Fcontent{
  height: 450rpx;
  color: white;
  background-color: #ee8167;
  .Cbox{
    position: relative;
    left: 140px;
    top: 56px;
  }
  .CtextSize{
    text-align: center;
    width: 90px;
    font-size: 15px;
  }
  .Cnumber{
    font-size: 38px;
  }
}
//冲稳保样式
.cwbox{
  display: flex;
  justify-content: space-around;
  position: relative;
  left: -6px;
  top: 75px;
  .flexT{
    display: flex;
    flex-direction: column;
  }
  .centerN{
    text-align: center;
  }
}
.dtBox{
  box-shadow: 0px 5px 15px #ddd;
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
    .zntb{
     font-size: 14px;
     width: 90px;
     color: white;
     background-color: #ee8167;
     border-radius: 30px;
     position: relative;
     top: -8px;
    }
  }
  
  .nav-list{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    .nav-img{
      width: 55px;
      height: 140rpx;
    }
  }
}
.bkziBox{
  background-color: #fcf0ee;
  box-sizing: border-box;
  .bkziheader{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .bkzi1v1 text{
      display: inline-block;
      color: #df613d;
      font-size: 16px;
      font-weight: 800;
    }
    .bkzi1v1 image,text{
      vertical-align: middle;
    }
    .bkziimg{
      width: 21px;
      height: 23px;
    }
    .bkzxmore{
      color: #ef8969;
    }
  }
  .teacherBox{
    display: flex;
    box-sizing: border-box;
    height:165px ;
    .scrollviewT{
      white-space: nowrap;
    }
    .classBox{
      width: 120px;
      height: 146px;
      background-color: white;
      margin: 5px 10px;
      border-radius: 8px;
      box-shadow: 2px 5px 15px #ddd;
      display: inline-block;
      .classlist{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 15px;
        .teacherview{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .teacherImg{
          width: 69px;
          height: 64px;
          position: relative;
          top: 0px;
          left:7px;
        }
        .zitianbao{
          width: 84px;
          height: 33px;
        }
      }
    }
  }
  .kbBox{
    background-color: white;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 1px 4px 15px #ddd;
    .kuaibaoBox{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-content: space-around;
      .hotimg{
        width: 20px;
        height: 20px;
      }
      .hottextView image,text{
        vertical-align: middle;
      }
      .hottextView text{
        font-weight: 800;
        font-size: 18px;
      }
      .Gmessage{
        font-size: 14px;
      }
      .right{
        color: #e0e0e0;
      }
    }
  }
  
}
uni-button{
    margin-left: 0;
    margin-right: 0;
  }


</style>
