<template>
  <div>
    <el-button type="primary" size="small" :disabled="disabled" @click="addParams">添加参数</el-button>
    <el-table :data="manyCatList" border stripe>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag :key="item" closable v-for="item in scope.row.attr_vals" @close="handleClose(scope.row,item)">{{item}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button v-else size="small" @click="showInput(scope.row)" class="button-new-tag">+ New Tag</el-button>

        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="attr_name" label="参数名称" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editParams(scope.row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteParams(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getParamsListInfo,commitEditParamsTagInfo} from "network/goodsParams";

export default {
  name: "DynamicParams",
  props:{
    disabled:{
      type:Boolean,
      default:true,

    },
    manyCatList:{
      type:Array,
      default:[]
    }
  },
  methods:{
    addParams(){
      this.$emit('addParams')
    },
    editParams(editParams){
      this.$emit('editParams',editParams)
    },
    deleteParams(deleteParams){
      this.$emit('deleteParams',deleteParams)
    },
    showInput(scopeRow){
      scopeRow.inputVisible = true;
      //让文本框自动获得焦点
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //文本框失去焦点，或者按下enter键
    handleInputConfirm(oldTags) {
      if (oldTags.inputValue) {
        oldTags.attr_vals.push(oldTags.inputValue);
        this.addNewTagData(oldTags);
      }
      oldTags.inputVisible = false;
      oldTags.inputValue = '';
    },
    addNewTagData(oldTags){
      let data={
        id:oldTags.cat_id,
        attr_id:oldTags.attr_id,
        attr_name:oldTags.attr_name,
        attr_sel:oldTags.attr_sel,
        //这里需要注意，数据库里存储的是字符串形式，这里需要将其在转换为原来的形式
        attr_vals:oldTags.attr_vals.join(' ')
      }
      commitEditParamsTagInfo(data).then(res=>{
        console.log(res);
      })
    },
    handleClose(row,tag){
      row.attr_vals.splice(row.attr_vals.indexOf(tag), 1);
      this.addNewTagData(row)
    }
  }
}
</script>

<style scoped>
.el-tag{
  margin:10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
}
</style>
