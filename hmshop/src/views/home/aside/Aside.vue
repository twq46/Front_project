<template>
  <div class="aside" >
    <div class="toggle" @click="toggleClick">| | |</div>
    <!--侧边栏菜单区-->
    <!--  collapse属性表示菜单是否要折叠
      unique-opened属性表示菜单里每次只能有一个一级菜单展开
      collapse-transition属性表示折叠的过程是否取消折叠的动画
      router属性就是为侧边栏开启路由模式，点击跳转到index绑定的页面
      default-active:当前激活菜单的index-->
    <el-menu
      background-color="#2c303a"
      text-color="#fff"
      active-text-color="#409BFF"
      :unique-opened="true"
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
      >
      <!--一级菜单-->
      <!-- 这里的index是必须是字符串   -->
      <el-submenu :index="item.path + ''" v-for="item in menusList" :key="item.id">
        <!-- 一级菜单的模版区-->
        <template slot="title">
          <!--图标-->
          <i :class="iconsObj[item.id]"></i>
          <!--文本-->
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="secondItem.path+ ''"
          v-for="secondItem in item.children"
          :key="secondItem.id"
          @click="saveNavState('/' + secondItem.path)">
          <!-- 二级菜单的模版区-->
          <template slot="title">
            <!--图标-->
            <i class="el-icon-menu"></i>
            <!--文本-->
            <span>{{ secondItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
import {getMenusList} from "network/home";

export default {
  name: "Aside",
  data(){
    return{
      menusList:[],
      iconsObj:{
        '125':'iconfont icon-users',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-3702mima',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao',
      },
      //是否折叠
      isCollapse:false,
      //被激活的链接地址
      activePath:'',
    }
  },
  created() {
    this.getMenusList()

  },
  mounted() {
    this.activePath = window.sessionStorage.getItem('activePath')
    // console.log(this.activePath);
  },
  methods:{
    getMenusList(){
      getMenusList().then(res => {
        console.log(res);
        this.menusList = res.data;
      })
    },
    toggleClick(){
      this.isCollapse = !this.isCollapse;
      this.$emit('isCollapse',this.isCollapse);
    },
    //保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    },
  }
}
</script>

<style lang="less" scoped>
.toggle{
  background-color: #4A5064;
  color: white;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  //文本之间的间隔
  letter-spacing: 0.2em;
}
.aside{
  height: 100%;
  //默认右侧会有1px的边框
  .el-menu{
    border-right: none;
  }
}
.iconfont{
  margin-right: 5px;
}
</style>
