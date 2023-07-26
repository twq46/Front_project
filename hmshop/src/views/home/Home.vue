<template>
  <div>
    <el-button @click="loginOut" primary="info">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    loginOut() {
      //清空session值，并且回到登录界面
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
