<template>
  <div>
    <!--  面包屑区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片  -->
    <el-card>
      <el-button type="primary" @click="addCat">添加分类</el-button>
      <!--树形表格-->
      <tree-table class="tree_table" :data="categoryList"  border :show-row-hover="false"
                  :show-index="true" index-text="#"
                  :columns="columns" :selection-type="false" :expand-type="false">
        <!--是否有效模版-->
        <template slot="isOK" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!--排序模版-->
        <template slot="sort" slot-scope="scope">
          <el-tag size="small" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="small" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" size="small" v-else>三级</el-tag>
        </template>
        <!--操作-->
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editCat(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteCat(scope.row)">删除</el-button>
        </template>
      </tree-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="categoryInfo.pagenum"
        :page-sizes="[1, 2, 3, 5]"
        :page-size="categoryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!--添加分类的弹窗-->
    <el-dialog
      title="添加分类"
      :visible.sync="addCatDialogVisible"
      width="50%" @close="addCatDialogClose">
      <el-form :model="catRuleForm" :rules="catRules" ref="catRuleFormRef" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="catRuleForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!--change-on-select属性：允许选择任意一级目录 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCatList"
            expand-trigger='hover'
            :props="cascaderProps"
            @change="parentCatChanged" clearable change-on-select></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCatDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddCat">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑分类弹窗-->
    <el-dialog
      title="修改分类"
      :visible.sync="editCatDialogVisible"
      width="50%">
      <el-form :model="catRuleForm" :rules="catRules" ref="catRuleFormRef" label-width="80px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="catRuleForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCatDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditCat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getGoodsCategory,getParentCatInfo,addCatInfo,editCatInfo,deleteCatInfo} from "network/goodsCategory";

export default {
  name: "GoodsCategory",
  created() {
    this.getGoodsCategoryData();
  },
  data(){
    return{
      categoryInfo:{
        type:3,
        //当前页码
        pagenum:1,
        //每页展示的数据
        pagesize:5,
      },
      categoryList:[],
      parentCatList:[],
      //选中的父级分类的id
      selectedKeys:[],
      total:0,
      //为table指定列的定义
      columns:[{label: '分类名称', prop: 'cat_name'},
               {label: '是否有效',prop:'cat_deleted',type: 'template', template: 'isOK',},
               {label: '排序',prop:'cat_level',type: 'template',template: 'sort'},
               {label: '操作',type: 'template',template: 'opt'}],
      addCatDialogVisible:false,
      editCatDialogVisible:false,
      catRuleForm:{
        cat_name:'',
        //分类的等级默认添加一级分类
        cat_level:0,
        //父级分类的id
        cat_pid:0
      },
      catRules:{
        cat_name:[{required:true,message:'请输入分类名称',trigger:'blur'}],
      },
      //指定级联选择器的配置对象
      cascaderProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children'
      },
      editCatId:0,
    }
  },
  methods:{
    getGoodsCategoryData(){
      getGoodsCategory(this.categoryInfo).then(res=>{
        this.categoryList = res.data.result;
        this.total = res.data.total;
      })
    },
    handleSizeChange(newSize){
      this.categoryInfo.pagesize = newSize;
      this.getGoodsCategoryData()
    },
    handleCurrentChange(pageNum){
      this.categoryInfo.pagenum = pageNum;
      this.getGoodsCategoryData()
    },
    addCat(){
      this.getParentCatListData()
      this.addCatDialogVisible = true
    },
    //获取父级分类列表
    getParentCatListData(){
      let data={type:2}
      getParentCatInfo(data).then(res=>{
        this.parentCatList = res.data
        console.log(res);
      })
    },
    //选择项发生变化触发这个函数
    parentCatChanged(){
      console.log(this.selectedKeys);
      if(this.selectedKeys.length > 0){
        //如果当前有选中父级的分类，则数组中最后一个id即为要添加分类名的父级id
        this.catRuleForm.cat_pid = this.selectedKeys[this.selectedKeys.length-1]
        //要添加分类的level也就是选中数组的长度
        this.catRuleForm.cat_level = this.selectedKeys.length
        return
      }else {
        //如果当前有选中父级的分类，则数组中最后一个id即为要添加分类名的父级id
        this.catRuleForm.cat_pid = 0
        //要添加分类的level也就是选中数组的长度
        this.catRuleForm.cat_level = 0
      }
    },
    //点击确定添加分类按钮
    confirmAddCat(){
      this.addCatData()
      this.addCatDialogVisible = false
    },
    addCatData(){
      addCatInfo(this.catRuleForm).then(res=>{
        if(res.meta.status !== 201){
          this.$message.error('添加分类失败')
        }else{
          this.$message.success('添加分类成功')
        }
        console.log(res);
        this.getGoodsCategoryData()
      })
    },
    addCatDialogClose(){
      this.$refs.catRuleFormRef.resetFields()
      this.selectedKeys = [];
      this.catRuleForm.cat_level = 0;
      this.catRuleForm.cat_pid = 0;
    },
    editCat(catRow){
      console.log(catRow);
      this.catRuleForm.cat_name = catRow.cat_name
      this.editCatId = catRow.cat_id
      this.editCatDialogVisible = true
    },
    confirmEditCat(){
      this.editCatDialogVisible = false
      editCatInfo(this.editCatId,this.catRuleForm.cat_name).then(res=>{
        console.log(res);
        if(res.meta.status!==200){
          return this.$message.error('修改分类失败')
        }else{
          this.$message.success('修改分类成功')
          this.getGoodsCategoryData()
        }
      })
    },
    deleteCat(cat){
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCatInfo(cat.cat_id).then(res=>{
          console.log(res);
          this.getGoodsCategoryData()
        });
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

  }
}
</script>

<style scoped>
.tree_table{
  margin-top: 15px;
}
</style>
