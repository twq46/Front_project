<template>
  <div>
    <!--  面包屑区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <el-alert :closable="false" show-icon title="注意：只允许为第三级分类设置相关参数！" type="warning"></el-alert>

      <!--选择商品分类区域-->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!--选择商品分类的级联选择框-->
          <el-cascader :clearable="true"
            v-model="selectKeys"
            :options="categoryList"
            expand-trigger="hover"
            :props="catValue"
            @change="selectChange" change-on-select></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <DynamicParams :disabled="buttonDisabled"
                         :many-cat-list="manyCatList" @addParams="addParams"
                         @editParams="editParams" @deleteParams="deleteParams"></DynamicParams>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <StaticAttribute :disabled="buttonDisabled"
                           :cat-list="staticCatList" @addParams="addParams"
                           @editParams="editParams" @deleteParams="deleteParams"></StaticAttribute>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数/属性对话框-->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addParamsDialogVisible"
      width="50%" @close="dialogClose">
      <el-form :model="addParamsRuleForm" :rules="addParamsRules"
               ref="addParamsRuleForm" label-width="80px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addParamsRuleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addParamsDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAdd">确 定</el-button>
  </span>
    </el-dialog>
    <!--修改按钮弹窗-->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editParamsDialogVisible"
      width="50%" @close="dialogClose">
      <el-form :model="addParamsRuleForm" :rules="addParamsRules"
               ref="addParamsRuleForm" label-width="80px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addParamsRuleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editParamsDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmEditAdd">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getCateListInfo,getParamsListInfo,confirmAddInfo,editParamsInfo,deleteParamsInfo} from "network/goodsParams";
import DynamicParams from "./children/DynamicParams";
import StaticAttribute from "./children/StaticAttribute";
export default {

  name: "CategoryParamas",
  components:{DynamicParams,StaticAttribute},
  data(){
    return{
      //级联选择器的数据
      categoryList:[],
      //动态参数面板的数据
      manyCatList:[],
      //静态属性面板的数据
      staticCatList:[],
      selectKeys:[],
      //默认激活的面板
      activeName:'many',
      //初始添加属性和添加参数按钮为禁用状态，只有当选择了三级分类之后才会解除禁用状态
      buttonDisabled:true,
      editRow:'',
      addParamsDialogVisible:false,
      editParamsDialogVisible:false,
      catValue:{
        value:'cat_id',
        label:'cat_name',
        children:'children'
      },
      addParamsRuleForm:{
        attr_name:'',
      },
      addParamsRules:{
        attr_name:[{required:true,message:'请输入参数名称',trigger:'blur'}]
      }
    }
  },
  created() {
    this.getCatListData();
  },
  computed:{
    //当前选中的三级分类的id
    catId(){
      return this.selectKeys.length === 3 ? this.selectKeys[2] : null
    },
    titleText(){
      return this.activeName === 'many' ? '动态参数':'静态属性'
    },
  },
  methods:{
    //获取级联表的数据
    getCatListData(){
      getCateListInfo().then(res=>{
        this.categoryList = res.data
      })
    },
    //级联选择器选择的三级分类发生变化
    selectChange(){
      //如果选中的不是三级分类
      if(this.selectKeys.length !== 3){
        this.selectKeys = []
        //如果选中的不是三级分类，则清空表格里的数据
        this.manyCatList = []
        this.staticCatList = []
        //如果选中的不是三级分类，则添加参数和添加属性按钮都属于禁用状态
        this.buttonDisabled = true
        return
      }
      //证明选中的是三级分类
      this.buttonDisabled = false;
      this.getParamsListData()
    },
    //面板的选中项发生变化
    handleClick(){
      this.getParamsListData()
    },
    //获取参数列表
    getParamsListData(){
      let data = {
        id:this.catId,
        sel:this.activeName
      }
      getParamsListInfo(data).then(res=>{
        console.log(res);
        res.data.forEach(item=>{
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' '): []
          item.inputVisible=false;
          item.inputValue=''
        })
        if(this.activeName === 'many'){
          this.manyCatList = res.data
        }else{
          this.staticCatList = res.data
        }
      })
    },
    //点击添加参数或者添加属性按钮
    addParams(){
      this.addParamsDialogVisible = true;
    },
    //弹窗关闭
    dialogClose(){
      this.$refs.addParamsRuleForm.resetFields()
    },
    // 在弹窗中点击了确认按钮
    confirmAdd(){
      let data={
        id:this.selectKeys[2],
        attr_name:this.addParamsRuleForm.attr_name,
        attr_sel:this.activeName,
      }
      confirmAddInfo(data).then(res=>{
        if(res.meta.status !==201){
          return this.$message.error('添加参数失败')
        }else{
          this.$message.success('添加参数成功')
          this.getParamsListData()
        }
      })
      this.addParamsDialogVisible = false
    },
    editParams(editParams){
      this.editRow = editParams
      this.addParamsRuleForm.attr_name = editParams.attr_name
      this.editParamsDialogVisible = true
    },
    confirmEditAdd(){
      let data={
        id:this.editRow.cat_id,
        attr_id:this.editRow.attr_id,
        attr_name:this.addParamsRuleForm.attr_name,
        attr_sel:this.editRow.attr_sel
      }
      editParamsInfo(data).then(res=>{
        console.log(res);
        if(res.meta.status !== 200){
          return this.$message.error('修改参数失败')
        }else{
          this.$message.success('修改参数成功')
          this.getParamsListData()
        }
      })
      this.editParamsDialogVisible = false
    },
    deleteParams(deleteParams){
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data={
          id:deleteParams.cat_id,
          attr_id:deleteParams.attr_id,
        }
        deleteParamsInfo(data).then(res=>{
          if(res.meta.status!==200){
             return this.$message.error('删除失败')
          }else{
            this.$message.success('删除成功')
          }
          this.getParamsListData()
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
.cat_opt{
  margin-top: 15px;
}
</style>
