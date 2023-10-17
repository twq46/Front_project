<template>
  <view>
    <view class="list-item">
      <!-- 老师图标 -->
      <view class="logo">
        <image :src="expertDetail.avatar" mode="widthFix"></image>
      </view>
      <!-- 右侧专家的信息 -->
      <view class="expert-info">
        <!-- 姓名和标签 -->
        <view class="name-tag">
          <view class="name">
            {{expertDetail.tianbaoshiName}}
          </view>
          <view class="tag">
            <view class="tag-item" v-for="(item,i) in labelInfo" :key="i">
              {{item.labelName}}
            </view>
          </view>
        </view>
        <!-- 专家简介 -->
        <view class="introduce">
          {{expertDetail.produce}}
        </view>
      </view>
    </view>
    
  </view>
</template>

<script>
  export default {
    name:"my-expert-item",
    props:{
      expertDetail:{}
    },
    data() {
      return {
        labelInfo:[]
      };
    },
    watch:{
      expertDetail:{
         handler(newValue, oldValue){
           this.getExpertTag()
         },
         deep: true,//监听对象内部的属性是否发生改变
         immediate: true,//当对象的某个属性发生变化之后，立即执行handler方法
      }
    },
    methods:{
      async getExpertTag(){
        const res = await uni.$http.get(`/system/user/${this.expertDetail.userId}`)
        this.labelInfo = res.data.labelInfo
      }
    }
  }
</script>

<style scoped lang="scss">
.list-item{
  display: flex;
  margin-top: 10px;
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 10px;
  align-items: center;
  .logo{
    image{
      width: 50px;
      height: 50px;
    }
  }
  .expert-info{
    .name-tag{
      display: flex;
      .name{
        
      }
      .tag{
        display: flex;
        font-size: 13px;
        
        .tag-item{
          margin-left: 5px;
          color:#ff6668;
          padding: 2px 5px;
          background-color: #ffeedf;
        }
      }
    }
    .introduce{
      margin-top: 5px;
      font-size: 13px;
    }
  }
}

</style>