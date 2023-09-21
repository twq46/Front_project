import { ref} from 'vue'
import { defineStore } from 'pinia'
import {getCategory} from "@/apis/layout";
export const useCategoryStore = defineStore('category', () => {
  //导航列表的逻辑
  //导航列表数据
  const categoryList = ref([])
  //获取导航列表数据的方法
  const getCategoryData = ()=>{
    getCategory().then(res =>{
      categoryList.value = res.result
    })
  }
  return {
    categoryList,
    getCategoryData
  }
})
