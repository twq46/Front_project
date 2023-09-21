<template>
  <ul class="app-header-nav">
    <li class="home" v-for="(item,i) in categoryList" :key="i">{{item.name}}</li>
  </ul>
</template>

<script setup>
import {getCategory} from "@/apis/layout";
import {onMounted,ref} from 'vue'
onMounted(()=>{
  getCategoryData()
})
const categoryList = ref([])
const getCategoryData = ()=>{
  getCategory().then(res =>{
    categoryList.value = res.result
  })
}
</script>

<style scoped lang="scss">
.app-header-nav{
  width: 820px;
  display: flex;
  justify-content: space-around;
  .home:hover{
    color: #1dc779;
    cursor: pointer;
    border-bottom: 1px solid #1dc779;
  }
}
</style>
