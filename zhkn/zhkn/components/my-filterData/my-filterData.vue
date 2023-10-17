<template>
  <view>
    <!-- 地区、类型、专业、查询范围过滤信息 -->
    <view class="filter-data" :style="{'margin-top':marginTop}">
      <view class="filter-box">
        <view class="filter-text" v-for="(item,i) in filterTitle" :key="i"  @click="activeFilterTitle(i)" >
          <text :class="{active:activeindex == i & filterActive}" :style="{'font-size':fontSize}">{{item.name}}</text>
          <uni-icons type="bottom" size="13"></uni-icons>
        </view>
      </view>
      <!-- 过滤信息展开区域 -->
      <view class="filter-expand" v-if="filterActive">
        <scroll-view scroll-y="true" style="height: 160px;">
          <view class="filter-list" >
            <view v-for="(item,index) in showFilterList" :key="index"  class="filter-item" :class="{filteritemActive:currentBatchActiveIndex === index && batchSelected || currentSubjectActiveIndex === index && subjectClassSelected}" @click="clickFilterItem(item,index)">{{item}}</view>
          </view>
        </scroll-view>
        <!-- 重置和确认按钮 -->
        <view class="btn-reset-confirm">
          <button>重置</button>
          <button class="confirm-btn" @click="confirmFilter">确定</button>
        </view>
      </view>
    </view>
           
  </view>
</template>

<script>
  export default {
    name:"my-filterData",
    props:{
      filterTitle:{
        type:Array,
        default:[]
      },
      cologeLevel:{
        type:Array,
        default:[]
      },
      
      subjectClassTitle:{
        type:Array,
        default:[]
      },
      marginTop:{
        type:String,
        default:'0px'
      },
      fontSize:{
        type:String,
        default:'14px'
      }
    },
    data() {
      return {
        activeindex:null,
        filterActive:false,
        currentBatchActiveIndex:null,
        currentSubjectActiveIndex:null,
        filterConten:['澳门','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港','香港'],
        subjectClassItemIsSelected:false,
      };
    },
    computed:{
      batchSelected(){
        return this.activeindex == 0 && this.filterTitle[this.activeindex].name == '院校批次'
      },
      subjectClassSelected(){
        return this.activeindex == 1 && this.filterTitle[this.activeindex].name == '学科门类'
      },
      showmajorBigClass(){
        return this.activeindex == 1 && this.filterTitle[this.activeindex].name == '学科门类' && this.subjectClassItemIsSelected
      },
      showFilterList(){
        if(this.batchSelected){
          return this.cologeLevel
        }else if(this.subjectClassSelected){
          return this.subjectClassTitle
        }else if(this.showmajorBigClass){
          return this.majorBigClassList
        }else{
          return []
        }
      },
      
    },
    methods:{
      //点击过滤的标题
      activeFilterTitle(index){
        this.activeindex = index
        this.filterActive = !this.filterActive
      },
      //点击了过滤列表中的某一项
      clickFilterItem(itemname,index){
       
        //如果是院校批次里的某一项
        if(this.batchSelected){
          this.currentBatchActiveIndex = index
          //点击院校批次之后清空上一次选中的学科门类的值
          this.currentSubjectActiveIndex = null
          this.$emit('batchFilterItem',itemname)
        }else if(this.subjectClassSelected){//如果是学科门类中的某一项
          this.currentSubjectActiveIndex = index
          this.subjectClassItemIsSelected = true
          this.$emit('subjuectFilterItem',itemname)
        }
      },
      //点击了确认按钮
      confirmFilter(){
        if(this.batchSelected || this.subjectClassSelected){
          this.filterActive =!this.filterActive
          this.$emit('confirm')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.filter-data{
  position: relative;
  .filter-box{
    display: flex;
    justify-content: space-around;
    padding-top: 5px;
    .filter-text{
      width: 20%;
      height: 25px;
      border-radius: 5px;
      line-height: 25px;
      text-align: center;
      background-color: #f7f7f7;
      font-size: 14px;
      padding: 3px;
    }
    .active{
      color:#ef845e;
    }
  }
  .filter-expand{
    position: absolute;
    z-index: 2;
    background-color: #fff;
    width: 100%;
    .filter-list{
      display: flex;
      flex-wrap: wrap;
      .filter-item{
      padding: 5px 20px;
      height: 36px;
      border: 1px solid #edeeef;
      margin: 10px 5px;
      text-align: center;
      line-height: 36px;
      border-radius: 3px;
    }
    .filteritemActive{
      background: #fcf0ec;
      border-color: #ef845e;
    }
    }
    
  }
  .btn-reset-confirm{
    display: flex;
    button{
      width: 45%;
    }
    .confirm-btn{
      color:#fff;
      background-color: #ef845e;
    }
  }
}

</style>