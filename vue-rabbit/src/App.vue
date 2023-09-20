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
  <el-button type="primary">Primary</el-button>
</template>


<style scoped>

</style>
