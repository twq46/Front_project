<template>
  <div>
    <!--  面包屑区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域-->
    <el-card>
      <!-- 2.为 ECharts 准备一个定义了宽高的 DOM -->
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
//1.导入echarts
import * as echarts from 'echarts'
import {getReportsInfo} from "network/home";

import _ from 'lodash'
export default {
  name: "DataReport",
  //此时页面上的元素，已经被渲染完毕了
  mounted(){
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    //4.准备数据和配置项
    getReportsInfo().then(res=>{
      if(res.meta.status !== 200){
        return this.$message.error('获取折线图数据失败')
      }
      this.$message.success('获取折线图数据成功')
      //使用lodash将api文档中的option和得到的折线图数据进行合并
      const result =  _.merge(res.data,this.options)
      //5.展示数据
      myChart.setOption(result)
    })
  },
  data(){
    return{
      //需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
