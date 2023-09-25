<script setup>
import {getBannerListInfo} from "@/apis/home";
import {onMounted, ref} from 'vue'
const bannerList = ref([])
const getBannerList = ()=>{
  getBannerListInfo().then(res =>{
    bannerList.value = res.result
  })
}
onMounted(()=>{
  getBannerList()
})

</script>

<template>
  <div class="home-banner">
    <el-carousel :interval="5000" arrow="always" height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<style scoped lang="scss">
.home-banner{
  width: 1240px;
  height: 500px;
  position: absolute;
  top: 0;
  left: 0;
  img{
    width: 100%;
    height: 500px;
  }
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
