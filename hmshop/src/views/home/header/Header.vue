<template>
  <div class="header">
    <div class="left">
      <img src="~assets/heima.png" alt="">
      <span>电商后台管理系统</span>
    </div>
    <el-button @click="loginOut" type="info">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    loginOut() {
      //清空session值，并且回到登录界面
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  height: 100%;
  display: flex;
  justify-content: space-between;//两个元素左右排列(一个靠最左，一个靠最右)
  align-items: center;//上下居中
}
.left{
  color: white;
  font-size: 20px;
  >span{
    margin-left: 5px;
  }
}
.left img,span{
  vertical-align: middle;
}

</style>
