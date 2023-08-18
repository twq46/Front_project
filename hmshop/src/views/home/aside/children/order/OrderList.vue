<template>
  <div>
    <!--  面包屑区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 订单输入和搜索框 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrderListData">
            <el-button slot="append" icon="el-icon-search" @click="getOrderListData"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单表格区 -->
      <el-table
        :data="orderList"
        style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="380px"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="80px"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款" width="90px">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="100px"></el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="280px">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editAddress"> </el-button>
          <el-button type="success" icon="el-icon-location-information" size="small" @click="showProgressBox"> </el-button>
        </el-table-column>
      </el-table>
      <!-- 分页管理-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 修改地址弹窗-->
    <el-dialog
      title="修改地址"
      :visible.sync="editAddressDialogVisible"
      width="50%" @close="addressDialogClosed">
      <el-form :model="editAddressRuleForm" :rules="editAddressRuleFormRules" ref="editAddressRuleForm" label-width="100px" >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="editAddressRuleForm.address1"
            :options="city_data"
            expandTrigger='hover'
            @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="editAddressRuleForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editAddressDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editAddressDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 查看物流进度的弹窗-->
    <el-dialog
      title="物流进度"
      :visible.sync="progressDialogVisible">
      <span>fas</span>
    </el-dialog>
  </div>
</template>

<script>
import {getOrderListInfo,getProgressInfo} from "network/order";
import city_data from "./city_data";
export default {
  name: "Order",
  data(){
    return {
      orderList:[],
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10,
      },
      total:0,
      editAddressDialogVisible:false,
      progressDialogVisible:false,
      editAddressRuleForm:{
        address1:[],
        address2:'',
      },
      editAddressRuleFormRules:{
        address1:[{required:true,message:'请选择城市',trigger:'blur'}],
        address2:[{required:true,message:'请输入详细地址',trigger:'blur'}],
      },
      city_data:city_data,
      cityVlaue:{
        value:''
      }
    }
  },
  created() {
    this.getOrderListData();
  },
  methods:{
    //获取订单列表信息
    getOrderListData(){
      getOrderListInfo(this.queryInfo).then(res=>{
        console.log(res);
        this.orderList = res.data.goods;
        this.total = res.data.total;
      })
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getOrderListData()
    },
    handleCurrentChange(newNum){
      this.queryInfo.pagenum = newNum;
      this.getOrderListData()
    },
    //修改地址弹窗显示
    editAddress(){
      this.editAddressDialogVisible = true;
    },
    handleChange(value){
      console.log(value);
    },
    //对话框关闭的时候清空级联选择器的内容
    addressDialogClosed(){
      this.$refs.editAddressRuleForm.resetFields()
    },
    //显示物流进度弹窗
    showProgressBox(){
      this.progressDialogVisible = true
    },
  }
}
</script>

<style scoped>
.el-cascader{
  width: 100%;
}
</style>
