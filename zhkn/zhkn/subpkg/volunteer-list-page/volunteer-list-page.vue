<template>
  <view class="volunteerlitst-box" :style="{height:contentHeight+'px'}">
    <view class="empty-volunteer" v-if="isEmpty">
     <image src="../../static/images/volunteerEmpty.png" mode=""></image>
    </view>
    <volunteer-item v-else  v-for="(item,index) in wishesList" :key="index" :item="item" @deleteVolunteer="deleteVolunteer"></volunteer-item>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        listId:null,
        wishesList:[],
        contentHeight:null,
        isEmpty:true,
      };
    },
    computed:{
      ...mapState('m_user',['userinfo'])
    },
    onLoad() {
      this.getListId()
      const that = this
      uni.getSystemInfo({
        success: (res) => {
          that.contentHeight = res.screenHeight
        }
      })
    },
    methods:{
      async getListId(){
        const {data:res} = await uni.$http.get(`/wishWX/getWxxAllHandleWishId?openId=${this.userinfo.openId}`)
        if(res.msg=='成功'){
          this.listId = res.data
          this.getVolunteerTableList()
        }
      },
      async getVolunteerTableList(){
        const {data:res} = await uni.$http.get(`/wishWX/getAllWishByListId2?listId=${this.listId}`)
          this.wishesList = res.data.wishes
          if(this.wishesList.length > 0){
            this.isEmpty = false
          }else{
            this.isEmpty = true
          }
      },
      async deleteVolunteer(item){
      const res = await uni.$http.delete(`/wishWX/deleteWishFromList?id=${item.id}`)
      if(res.data.data== '删除成功'){
        uni.$showMsg('删除成功!')
        this.getVolunteerTableList()
      }
      }
    }
  }
</script>

<style scoped lang="scss">
.empty-volunteer{
  height: 100%;
  image{
    height: 100%;
    width: 100%;
  }
}
</style>
