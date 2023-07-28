<template>
  <el-container >
    <!--头部区域-->
    <el-header>
      <Header></Header>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--页面侧边栏-->
      <el-aside :width="isCollapseT ? '64px' : '200px'">
        <Aside @isCollapse="isCollapse"></Aside>
      </el-aside>
      <!--页面主体区域-->
      <el-main>
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./header/Header";
import Aside from "./aside/Aside";
import Main from "./main/Main";

export default {
  name: "Home",
  components: {
    Header,
    Aside,
    Main,
  },
  data(){
    return {
      isCollapseT:false
    }
  },
  methods:{
    isCollapse(isCollapse){
      this.isCollapseT = isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}

//element-ui的标签名就是一个类名
.el-header {
  background-color: #373d41;

}

.el-aside {
  background-color: #2c303a;
}

.el-main {
  background-color: #e6ebee;
}
</style>
