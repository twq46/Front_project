<template>
  <view>
    <view class="topimage">
      <image src="../../static/images/editScore.png" mode="widthFix"></image>
    </view>
    <uni-card class="scorecard">
    	<view class="title">
    	  2023年高考模拟填报
    	</view>
      <!-- 学生成绩等的信息信息 -->
      <view class="detail-info">
        <!-- 高考省份 -->
        <view class="info-item">
          <view class="left-info">
            高考省份
          </view>
          <view class="right-info" @click="provinceOpen" v-if="!userinfo.examProvince">
            {{currentSelectProvince ? currentSelectProvince:'请选择'}}
            <uni-icons type="arrowright" size="15" color="#5f5f5f"></uni-icons>
          </view>
         <view class="right-info" v-else>
           {{userinfo.examProvince}}
         </view>
        </view>
        <!-- 高考科目 -->
        <view class="info-item">
          <view class="left-info">
            高考科目
          </view>
          <view class="right-info" v-if="userinfo.physics || userinfo.chemistry || userinfo.biology || userinfo.politics || userinfo.history || userinfo.geography">
            {{userinfo.physics == 1 ? '物':''}}
            {{userinfo.chemistry == 1 ? '化':''}}
            {{userinfo.biology == 1 ? '生':''}}
            {{userinfo.politics == 1 ? '政':''}}
            {{userinfo.history == 1 ? '历':''}}
            {{userinfo.geography == 1 ? '地':''}}
          </view>
          <view class="right-info" @click="majorOpen" v-else>
            <view class="subjectlist" v-if="selectsubjectList.length > 0">
              <view class="" v-for="(item,index) in selectsubjectList" :key="index" >
                {{ item + (index < (selectsubjectList.length - 1) ? ',' : '') }}
              </view>
            </view>
            <view class="" v-else>
              请选择
            </view>
            <uni-icons type="arrowright" size="15" color="#5f5f5f"></uni-icons>
          </view>
          
        </view>
        <!-- 高考成绩 -->
        <view class="info-item">
          <view class="left-info">
            高考分数
          </view>
          <view class="right-info" v-if="!userinfo.score">
            <input type="number" v-model="score" placeholder="请输入你的成绩" @input="inputScore">
          </view>
          <view class="right-info" v-else>
            <input type="number" v-model="score" placeholder="请输入你的成绩" @input="inputScore">
          </view>
        </view>
        <!-- 高考位次 -->
        <view class="info-item">
          <view class="left-info">
            高考位次
          </view>
          <view class="right-info" v-if="!userinfo.rank">
            <input type="number" v-model="rank" placeholder="请输入你的省排名" @input="rankInput">
          </view>
          <view class="right-info" v-else>
            <input type="number" v-model="rank" placeholder="请输入你的省排名" @input="rankInput">
          </view>
        </view>
        <!-- 可输入的位次范围 -->
        <view class="rankScope">
          可输入的位次范围：{{highRank}}～{{lowRank}}
        </view>
      </view>
      <!-- 省份弹出框 -->
       <uni-popup ref="provincePopup" type="bottom" background-color="#fff">
         <!-- 省份列表 -->
         <view class="province-list">
           <scroll-view scroll-y="true" >
             <view class="list">
                <view class="province-item" v-for="(item,index) in provinceList" v-if="index > 0" :key="index" :class="{activeProvince:currentIndex === index}" @click="clickProvinceItem(index)">
                 {{item}}
               </view>
             </view>
             
           </scroll-view>
         </view>
       </uni-popup>
       <!-- 高考科目弹出框 -->
      <uni-popup ref="subjectPopup" background-color="#fff" type="bottom">
        <!-- 高考科目 -->
        <view class="province-list">
          <scroll-view scroll-y="true" >
            <view class="list">
               <view class="province-item" v-for="(item,index) in subjectList"  :key="index" :class="{activeProvince:selectsubjectList.includes(item)}" @click="clickSubjectItem(index)">
                {{item}}
              </view>
            </view>
            
          </scroll-view>
        </view>
      </uni-popup>
      <!-- 提示信息 -->
      <view class="tip">
        <view>*高考成绩和位次只有1次修改机会，</view>
        <view>
          其准确性决定推荐结果和录取概率，请认真填写
        </view>
      </view>
      <!-- 提交按钮 -->
      <view class="confirm">
         <view class="confirmtwq" @click="confirmSubmitClick">
          确认提交
         </view>
      </view>
     
    </uni-card>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        scoreInputTimer:null,
        currentIndex:null,
        physics:null,
        chemistry:null,
        biology:null,
        politics:null,
        history:null,
        geography:null,
        highRank:0,
        score:null,
        rank:null,
        lowRank:3000000,
        currentSelectProvince:'',
        labelinfo:[],
        provinceList:[],
        subjectList:['物','化','生','政','史','地'],
        selectsubjectList:[],
      };
    },
    computed:{
      ...mapState('m_user',['userinfo']),
    },
    onLoad() {
      //获取省份信息
      this.getProvinceData()
      this.score = this.userinfo.score
      this.rank = this.userinfo.rank
      this.physics = this.userinfo.physics
      this.chemistry = this.userinfo.chemistry
      this.biology = this.userinfo.biology
      this.politics = this.userinfo.politics
      this.history = this.userinfo.history
      this.geography = this.userinfo.geography
    },
    methods:{
      ...mapMutations('m_user',['updateUserScore','updateUserRank','updateUserProvince','updateUserInfo']),
      //获取高考的省份
      getProvinceData(){
        uni.request({
          url:'https://www.zytb.top/NEMT/gk/school/findAllProvince',
          method:'GET',
          success: (res) => {
            // console.log(res)
            this.provinceList = res.data.data
          }
        })
      },
      //省份弹出效果
      provinceOpen(){
        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
        this.$refs.provincePopup.open('bottom')
      },
      //高考科目弹出效果
      majorOpen(){
        this.$refs.subjectPopup.open('bottom')
      },
      //点击了省份中的某一个
      clickProvinceItem(index){
        this.currentIndex = index
        this.currentSelectProvince = this.provinceList[index]
        this.updateUserProvince(this.currentSelectProvince)
        //关闭弹出窗
        this.$refs.provincePopup.close()
      },
      //点击了高考科目中某一个
      clickSubjectItem(index){
        this.selectsubjectList.push(this.subjectList[index])
        this.physics = this.selectsubjectList.find((item) => item === '物') ? 1 : 0;
        this.chemistry = this.selectsubjectList.find((item) => item === '化') ? 1 : 0;
        this.biology = this.selectsubjectList.find((item) => item === '生') ? 1 : 0;
        this.politics = this.selectsubjectList.find((item) => item === '政') ? 1 : 0;
        this.history = this.selectsubjectList.find((item) => item === '历') ? 1 : 0;
        this.geography = this.selectsubjectList.find((item) => item === '地') ? 1 : 0;
        // console.log(this.physics);
      },
      
      //处理输入分数事件
      inputScore(e){
        if(e.detail.value == ''){
          this.lowRank = 3000000 
          this.highRank = 0
        }
        clearTimeout(this.scoreInputTimer)
        this.scoreInputTimer = setTimeout(()=>{
          // console.log(e.detail.value)
          
          this.updateUserScore(e.detail.value)
          this.getRankScopeData()
        },500)
      },
      //根据省份，科目，分数计算位次范围
      async getRankScopeData(){
        ////https://www.zytb.top/agent_gk_new/userWX/rankByScore?physics=1&province=山东&score=600
        const query = {
          physics:this.userinfo.physics,
          province:this.userinfo.examProvince,
          score:this.userinfo.score
        }
        const res = await uni.$http.get('/userWX/rankByScore',query)
        this.lowRank = res.data.data.lowRank
        this.highRank = res.data.data.highRank
      },
      //处理输入的位次信息
      rankInput(e){
        this.updateUserRank(e.detail.value)
      },
      //点击确认提交
      async confirmSubmitClick(){
        // 如果省份没有选择
        if(this.userinfo.examProvince == '') return uni.$showMsg('请选择省份')
        //如果高考科目没有选择
        if(this.userinfo.physics == 0 && this.userinfo.chemistry == 0 && this.userinfo.biology == 0&& this.userinfo.politics == 0&& this.userinfo.history == 0&& this.userinfo.geography == 0) return uni.$showMsg('请选择科目')
        //如果成绩没有输入
        if(this.userinfo.score == null) return uni.$showMsg('请输入高考分数')
        //如果位次没有输入
        if(this.userinfo.rank == null) return uni.$showMsg('请输入高考位次')
        const res =await uni.$http.post(`/userApp/wxxAddUserInfo?openId=${this.userinfo.openId}&score=${this.userinfo.score}&examProvince=${this.userinfo.examProvince}&physics=${this.physics}&chemistry=${this.chemistry}&biology=${this.biology}&politics=${this.politics}&history=${this.history}&geography=${this.geography}&rank=${this.userinfo.rank}&nickName=${this.userinfo.nickName}&avatarUrl=${this.userinfo.avatarUrl}`)
        
        if(res.data.code === 200){
          this.updateUserInfo(res.data.data)
          uni.$showMsg('用户信息填写成功')
          uni.navigateBack({
              delta: 1
          });
        } 
        
      },
    }
  }
</script>

<style scoped lang="scss">
.topimage{
  image{
    width: 100%;
  }
}
.scorecard{
  position: relative;
  top: -40px;
  .title{
    font-weight: bold;
    text-align: center;
  }
  .detail-info{
    margin-top: 30px;
    .info-item{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
      margin-bottom: 15px;
      .right-info{
        display: flex;
        .subjectlist{
          display: flex;
        }
        input{
          text-align: right;
        }
      }
    }
    
    .rankScope{
      text-align: right;
      color: red;
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
  .tip{
    color: #7e7e7e;
    font-size: 13px;
  }
  .confirm{
    display: flex;
    justify-content: center;
    margin: 20px 0;
    .confirmtwq{
      width: 80%;
      height: 40px;
      font-size: 15px;
      color:white;
      text-align: center;
      line-height: 40px;
      border-radius: 30px;
      background-color: #ee8358;
    }
    
  }
  
}

.list{
  display: flex;
  flex-wrap: wrap;
  .province-item{
    width: 15%;
    height: 36px;
    text-align: center;
    line-height: 36px;
    margin: 5px;
    border: 1px solid #ebebeb;
    border-radius: 5px;
  }
  .activeProvince{
    background-color: #dc704f;
    color: white; 
  }
}
</style>
