<template>
  <ul class="app-header-nav">
    <li>
      <router-link to="/" class="home">首页</router-link>
    </li>
    <li v-for="(item,i) in categoryStore.categoryList" :key="i">
      <router-link to="/" class="home">{{item.name}}</router-link>
    </li>
  </ul>
</template>

<script setup>
import {onMounted,ref} from 'vue'
import {useCategoryStore} from "@/stores/category";

//使用pinia里的数据
const categoryStore = useCategoryStore()
onMounted(()=>{
  categoryStore.getCategoryData()
})
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
