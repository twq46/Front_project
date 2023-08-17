<template>
  <div>
    <!--  面包屑区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图区域-->
    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!--步骤条区域-->
      <el-steps :active="parseInt(tabIndex)" align-center :space="200" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="addForm" :rules="addFormRules" ref="addRuleForm" label-position="top">
        <el-tabs :tab-position="tabPosition" v-model="tabIndex" :before-leave="changeTag" @tab-click="tabClick">
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="addForm.goods_cat"
                :clearable="true"
                :options="catList"
                expandTrigger="hover"
                :props="catValue"
                @change="handleChange" change-on-select></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item :label="item1.attr_name" v-for="item1 in manyTabData">
              <el-checkbox-group v-model="item1.attr_vals">
                <el-checkbox v-for="item2 in item1.attr_vals" :label="item2" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item :label="item.attr_name" v-for="item in onlyTabData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              class="upload-demo"
              :action="picUpLUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture" :headers="headerObj" :on-success="picLoadSuc">
              <el-button size="small" type="primary" >点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <el-form-item>
              <!-- 富文本编辑器-->
              <quill-editor v-model="addForm.goods_introduce"></quill-editor>
              <el-button type="primary" class="addCat" @click="add">添加商品</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!--预览图片的弹窗-->
    <el-dialog
      title="图片预览"
      :visible.sync="picDialogVisible"
      width="50%">
      <img :src="imgUrl" class="previcwImg">
    </el-dialog>
  </div>
</template>

<script>
import {getCatListInfo,addGoodsInfo} from "network/goodsList";
import {getParamsListInfo} from "network/goodsParams";

import _ from 'lodash'
export default {
  name: "addGoods",
  data() {
    return {
      tabPosition: 'left',
      tabIndex: 0,
      catList: [],
      selectKeys: [],
      manyTabData: [],
      onlyTabData:[],
      picDialogVisible:false,
      imgUrl:'',
      headerObj:{
        Authorization:window.sessionStorage.getItem('token')
      },
      picUpLUrl:'http://127.0.0.1:8888/api/private/v1/upload',
      //级联选择器props绑定的数据
      catValue: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //添加商品的表单数据对象
      addForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        pics:[],
        //商品的描述信息
        goods_introduce:'',
        attrs:[],
      },
      //添加商品表单数据的验证规则
      addFormRules: {
        goods_name: [{required: true, message: '请输入商品名称', trigger: 'blur'}],
        goods_price: [{required: true, message: '请输入商品价格', trigger: 'blur'}],
        goods_weight: [{required: true, message: '请输入商品重量', trigger: 'blur'}],
        goods_number: [{required: true, message: '请输入商品数量', trigger: 'blur'}],
        goods_cat: [{required: true, message: '请输入商品分类', trigger: 'blur'}],
      },
    };
  },
  created() {
    this.getCatListData()
  },
  methods: {
    getCatListData() {
      getCatListInfo().then(res => {
        this.catList = res.data;
        console.log(res);
      })
    },
    //级联选择器选项发生改变
    handleChange() {
      console.log(this.addForm.goods_cat);
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    //标签页发生改变的时候
    changeTag() {
      if (this.tabIndex !== 0 && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        this.tabIndex = '0'
        //返回false之后就会阻止标签页的切换
        return false
      }
    },
    //但点击标签页的时候
    tabClick() {
      //当点击了商品参数标签页
      if (this.tabIndex == 1) {
        let data = {
          id: this.addForm.goods_cat[2],
          sel: 'many'
        }
        getParamsListInfo(data).then(res => {
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          })
          this.manyTabData = res.data
        })
      }else if(this.tabIndex == 2){
        let data = {
          id: this.addForm.goods_cat[2],
          sel: 'only'
        }
        getParamsListInfo(data).then(res => {
          this.onlyTabData = res.data
          console.log(res);
        })
      }
    },
    //点击移除此文件时的处理函数
    handleRemove(file) {
      //在以添加的数组移除删除图片的路径
      this.addForm.pics.forEach((item,index)=>{
        if(item['pic'] === file.response.data.tmp_path){
          this.addForm.pics.splice(index,1)
        }
      })
    },
    //点击已上传文件的处理函数
    handlePreview(file) {
      console.log(file);
      this.imgUrl = file.response.data.url;
      this.picDialogVisible = true
    },
    //图片上传成功后的处理函数
    picLoadSuc(response, file, fileList){
      let data = {
        pic:response.data.tmp_path
      }
      this.addForm.pics.push(data);
      console.log(this.addForm.pics);
    },
    //添加商品
    add(){
      //表单预验证
      this.$refs.addRuleForm.validate(valid=>{
        if(!valid){
          return this.$message.error('请填写必要的表单项')
        }
        //执行添加商品的操作
        //lodash cloneDeep(obj)
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')
        //处理动态参数和静态属性
        this.manyTabData.forEach(item =>{
          let dInfo = {
            attr_id:item.attr_id,
            attr_value:item.attr_vals.join(' '),
          }
          this.addForm.attrs.push(dInfo)
        })

        //处理静态属性
        this.onlyTabData.forEach(item =>{
          let dInfo = {
            attr_id:item.attr_id,
            attr_value:item.attr_vals,
          }
          this.addForm.attrs.push(dInfo)
        })
        form.attrs = this.addForm.attrs
        addGoodsInfo(form).then(res=>{
          console.log(res);
          if(res.meta.status!=201){
            return this.$message.error('添加商品失败')
          }
          this.$message.success('添加商品成功')
          this.$router.push('/goods')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px;
}
.el-button+.el-button, .el-checkbox.is-bordered+.el-checkbox.is-bordered {
  margin-left: 0px;
}
.previcwImg{
  width: 100%;
}
.addCat{
  margin-top: 15px;
}
</style>
