<template>
  <view class="message-box">
    <view class="top-bgc"></view>
    <view class="card-box">
      <uni-table border stripe emptyText="暂无更多数据" >
      	<!-- 表头行 -->
      	<uni-tr >
      		<uni-th align="center" width="30" >填报师姓名</uni-th>
      		<uni-th align="center" width="80" >咨询内容</uni-th>
      		<uni-th align="center" width="40">状态</uni-th>
      	</uni-tr>
      	<!-- 表格数据行 -->
      	<uni-tr v-for="(item,index) in messageList" :key="index">
          <uni-td align="center">{{item.tianbaoshiName}}</uni-td>
          <uni-td align="center">{{item.askContent}}</uni-td>
          <uni-td align="center">{{item.status}}</uni-td>
      	</uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        userId:null,
        messageList:[]
      };
    },
    onLoad() {
      this.getInfo()
    },
    methods:{
     async getInfo(){
       const {data:res} = await uni.$http.get('/getInfo')
       this.userId = res.user.userId
       const {data:resMessage} = await uni.$http.get(`/system/user/selectByUserId?userId=${this.userId}`)
       this.messageList = resMessage.data.list
       // console.log(resMessage)
     }
    }
  }
</script>

<style scoped lang="scss">
.top-bgc{
  height: 230px;
  background-color: #ef8567;
}
.card-box{
  background-color: #fff;
  height:200px;
  width: 95%;
  padding: 10px;
  position: relative;
  top: -80px;
  left: 50%; /* 将元素的左边缘放在父容器的中心 */
  transform: translateX(-50%); /* 将元素的中心对齐到父容器的中心 */
  border-radius: 10px 10px 0 0;
  .itemlist{
    .item{
    }
  }
  
  .bottom-box{
    padding: 0 10px;
    margin-top: 20px;
  }
}
</style>
