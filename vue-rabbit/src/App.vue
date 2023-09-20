<script setup>
import {onMounted} from 'vue'
import {getCategory} from '@/apis/test'
const getCategoryData = ()=>{
  getCategory().then(res=>{
    console.log(res)
  })
}
onMounted(()=>{
  getCategoryData()
})
</script>

<template>
  <!--  一级路由的出口组件-->
  <router-view></router-view>
</template>


<style scoped>

</style>
