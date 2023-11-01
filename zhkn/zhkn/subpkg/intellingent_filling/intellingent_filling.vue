<template>
  <view class="tb-box">
    <view class="stick-box">
       <!-- 搜索框 -->
      <view class="search-box">
      <!-- 基本用法 -->
     <uni-search-bar @confirm="search" @input="input" cancelButton="none" placeholder="请输入学校名称"></uni-search-bar>
      </view>
      <!-- 分段器和过滤数据 -->
       <view>
        <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#ed6c4a"></uni-segmented-control>
        <!-- 地区、类型、专业、查询范围过滤信息 -->
        <!-- <view class="filter-box">
          <my-filterData :filter-title="filterTitle" :marginTop="'5px'"></my-filterData>
        </view> -->
       </view>
    </view>
    
    <!-- 各个选项卡的内容区域 -->
    <view class="content">
      <!-- 可冲击内容 -->
      <view v-if="current === 0">
        <scroll-view  :scroll-y="isContinueScroll" @scroll="scroll" :style="{height:contentHeight + 'px'}" >
            <college-card v-for="(item,i) in cschoolList" :school-item="item" :key="i"  :wish-list="wishesList" @getcwbData="getcwbData"></college-card>
        </scroll-view>
      </view>
      <!-- 较稳妥内容 -->
      <view v-if="current === 1" >
        <scroll-view :scroll-y="isContinueScroll" @scroll="scroll" :style="{height:contentHeight + 'px'}" >
          <college-card :canType="'稳'" :bgc="'#5eabf8'" v-for="(witem,wi) in wschoolList" :school-item="witem" :key="wi"   :wish-list="wishesList" @getcwbData="getcwbData"></college-card>
        </scroll-view>
      </view>
      <!-- 可保底内容 -->
      <view v-if="current === 2" >
        <scroll-view :scroll-y="isContinueScroll" @scroll="scroll" :style="{height:contentHeight + 'px'}" >
         <college-card :canType="'保'" :bgc="'#5bc492'" v-for="(bitem,bi) in bschoolList" :school-item="bitem" :key="bi"   :wish-list="wishesList" @getcwbData="getcwbData"></college-card>
         </scroll-view>
      </view>
    </view>
    <!-- 开通vip查看更多院校 -->
    <view class="viplm" v-if="userinfo.vip !== 1 && !isContinueScroll" @click="gotoVipPage">
      <view class="vipbtn">
        开通VIP查看更多院校
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    onShow() {
      this.getVolunteerList()
    },
    onLoad() {
      this.items = [`可冲击${this.userinfo.rushNum['冲']}`, `较稳妥${this.userinfo.rushNum['稳']}`, `可保底${this.userinfo.rushNum['保']}`],
      this.getCWBSchoolList()
      const that = this
      uni.getSystemInfo({
        success: (res) => {
          that.contentHeight = res.windowHeight
        }
      })
      
    },
    data() {
      return {
        contentHeight:null,
        isContinueScroll:true,
        scrollPosition:0,
        filterTitle:[
          {name:'地区'},
          {name:'类型'},
          {name:'专业'},
          {name:'查询范围'},
        ],
        items: [],
        cschoolList:[],
        wschoolList:[],
        bschoolList:[],
        majorItemTable:[],
        current: 0,
        isChecked:false,
        activeindex:null,
        wishesList:[],
      };
    },
    methods:{
      getcwbData(){
        this.getCWBSchoolList()
      },
      async getVolunteerList(){
        //获取表单的id
        const {data:reslistid} = await uni.$http.get(`/wishWX/getWxxAllHandleWishId?openId=${this.userinfo.openId}`)
        //表单获取成功获取志愿表里志愿
        if(reslistid.msg=='成功'){
          const {data:reslist} = await uni.$http.get(`/wishWX/getAllWishByListId2?listId=${reslistid.data}`)
          this.wishesList = reslist.data.wishes
        }
      },
      //监测滚动
      scroll(e){
        console.log(e)
        let scrollTop = e.detail.scrollTop
        
        const scrollThreshold = 100
        if(scrollTop > scrollThreshold && this.userinfo.vip !== 1){
          this.isContinueScroll = false
        }else if(scrollTop < scrollThreshold && this.userinfo.vip !== 1){
          this.isContinueScroll = true
        }
      },
      //开通vip
      gotoVipPage(){
        uni.switchTab({
          url:'/pages/vip/vip'
        })
      },
      //跳转到志愿表单界面
      addVolunteerTable(){
        
      },
      //冲稳保大学分开的接口
    async getCWBSchoolList(){
        const {data:res}  = await uni.$http.get(`/extendWX/getSchoolFirstOfRPSForWX?openId=${this.userinfo.openId}&examProvince=${this.userinfo.examProvince}&score=${this.userinfo.score}&rank=${this.userinfo.rank}&batch=本科`)
        this.cschoolList = res.data['冲']
        this.wschoolList = res.data['稳']
        this.bschoolList = res.data['保']
    },
     onClickItem(e) {
        if (this.current != e.currentIndex) {
          this.current = e.currentIndex;
        }
      },
      radioClick(){
        this.isChecked = !this.isChecked
      },
    }
  }
</script>

<style scoped lang="scss">
.tb-box{
  position: relative;
}
.stick-box{
  position: sticky;
  top: 0px;
  z-index: 2;
  background-color: #fff;
}

.content{
  background-color: #f8f8f8;
  
}
.viplm{
  background-color: #fff;
  padding:5px 20px;
  position: sticky;
  bottom: 0;
  z-index: 2;
  .vipbtn{
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    line-height: 20px;
    color: #fff;
    background-color: #f07251;
  }
}
</style>
