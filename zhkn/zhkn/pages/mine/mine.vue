<template>
  <view class="">
    <!-- 用户未登录 -->
    <my-login v-if="!token"></my-login>
    <!-- 用户已登录 -->
    <my-userinfo v-else></my-userinfo>
    
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
      ...mapState('m_user',['token'])
    },
   
  }
</script>

<style scoped lang="scss">



</style>
