<template>
  <div class="aside" >
    <div class="toggle" @click="toggleClick">| | |</div>
    <!--侧边栏菜单区-->
    <!--  collapse属性表示菜单是否要折叠
      unique-opened属性表示菜单里每次只能有一个一级菜单展开
      collapse-transition属性表示折叠的过程是否取消折叠的动画-->
    <el-menu
      background-color="#2c303a"
      text-color="#fff"
      active-text-color="#409BFF"
      :unique-opened="true"
      :collapse="isCollapse" :collapse-transition="false">
      <!--一级菜单-->
      <!-- 这里的index是必须是字符串   -->
      <el-submenu :index="item.id + ''" v-for="item in menusList" :key="item.id">
        <!-- 一级菜单的模版区-->
        <template slot="title">
          <!--图标-->
          <i :class="iconsObj[item.id]"></i>
          <!--文本-->
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item :index="secondItem.id+ ''" v-for="secondItem in item.children" :key="secondItem.id">
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
      isCollapse:false,
    }
  },
  created() {
    this.getMenusList()
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
    }
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
