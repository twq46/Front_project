<template>
  <view>
    教师详情界面
  </view>
</template>

<script>
  export default {
    data() {
      return {
        teacherInfo:{}
      };
    },
    onLoad(options) {
      this.teacherInfo = JSON.parse(options.teacherInfo)
      console.log(this.teacherInfo)
    }
  }
</script>

<style scoped lang="scss">

</style>
