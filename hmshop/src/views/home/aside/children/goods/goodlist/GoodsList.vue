<template>
  <div>
    <!--  面包屑区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!--输入搜索框和添加商品按钮      -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsListData">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsListData"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!--商品列表表格数据 -->
      <el-table :data="goodList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="95px"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="70px"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="160px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editGoods(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteGoods(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10,50,100]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" background>
      </el-pagination>
    </el-card>
    <!-- 编辑商品弹窗-->
    <el-dialog
      title="修改商品"
      :visible.sync="editGoodsDialogVisible"
      width="50%">
      <el-form :model="editRuleForm" :rules="editRules" ref="editRuleForm" label-width="100px">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editRuleForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model="editRuleForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model="editRuleForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model="editRuleForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editGoodsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getGoodListInfo, deleteGoodsInfo, editGoodsInfo} from "network/goodsList";

export default {
  name: "Goods",
  created() {
    this.getGoodsListData();
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      goodsId:'',
      editRuleForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        pics: [],
        //商品的描述信息
        goods_introduce: '',
        attrs: [],
      },
      editRules: {
        goods_name: [{required: true, message: '请输入商品名称', trigger: 'blur'}],
        goods_price: [{required: true, message: '请输入商品价格', trigger: 'blur'}],
        goods_weight: [{required: true, message: '请输入商品重量', trigger: 'blur'}],
        goods_number: [{required: true, message: '请输入商品数量', trigger: 'blur'}],
        goods_cat: [{required: true, message: '请输入商品分类', trigger: 'blur'}],
      },
      //商品列表表格数据
      goodList: [],
      //商品总数
      total: 0,
      //编辑商品弹窗是否显示
      editGoodsDialogVisible: false,
    }
  },
  methods: {
    getGoodsListData() {
      getGoodListInfo(this.queryInfo).then(res => {
        console.log(res);
        this.goodList = res.data.goods
        this.total = res.data.total
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsListData()
    },
    handleCurrentChange(newNum) {
      this.queryInfo.pagenum = newNum
      this.getGoodsListData()
    },
    //添加商品
    goAddPage() {
      this.$router.push('/goods/add')
    },
    //修改商品
    editGoods(row) {
      console.log(row);
      this.goodsId = row.goods_id
      this.editRuleForm.goods_name = row.goods_name
      this.editRuleForm.goods_price = row.goods_price
      this.editRuleForm.goods_number = row.goods_number
      this.editRuleForm.goods_weight = row.goods_weight
      this.editGoodsDialogVisible = true
    },
    // 确定修改商品
    confirmEditGoods() {
      this.$refs.editRuleForm.validate(valid => {
        if (!valid) return
        editGoodsInfo(this.goodsId,this.editRuleForm).then(res => {
          console.log(res);
          if (res.meta.status !== 201) {
            return this.$message.error('修改商品失败')
          }
          this.$message.success('修改商品成功')
          this.editGoodsDialogVisible = false;
        })
      })
    },
    //删除商品
    deleteGoods(row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodsInfo(row.goods_id).then(res => {
          if (res.meta.status !== 200) {
            return this.$message.error('删除失败')
          } else {
            this.$message.success('删除成功')
            this.getGoodsListData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
