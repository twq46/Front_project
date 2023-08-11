<template>
  <div>
    <!--  面包屑区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片  -->
    <el-card>
      <el-button type="primary" @click="addRolesVisible = true">添加角色</el-button>
      <el-table :data="rolesList" border stripe>
        <!-- 展开列-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom',index === 0 ? 'bdtop':'']" v-for="(item1,index) in scope.row.children"
                    :key="item1.id">
              <!-- 一级权限-->
              <el-col :span="5">
                <el-tag closable @close="deleteRightById(scope.row,item1.id)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限的渲染-->
              <el-col :span="19">
                <!-- 二级菜单-->
                <el-row :class="[index !== 0 ? 'bdtop':'']" v-for="(item2,index) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="deleteRightById(scope.row,item2.id)">{{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--三级菜单-->
                  <el-col :span="18">
                    <!--  closable属性可以定义一个标签是否可移除，一旦点击了移除图标，就会调用close定义的事件-->
                    <el-tag closable @close="deleteRightById(scope.row,item3.id)"
                            v-for="(item3,index) in item2.children" :key="item3.id" type="warning">{{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <!--            <pre>-->
            <!--              {{scope.row}}-->
            <!--            </pre>-->

          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="editRole(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteRole(scope.row.id)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="small" @click="distributeDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--添加角色的弹窗-->
    <el-dialog
      title="添加角色"
      :visible.sync="addRolesVisible"
      width="50%" @close="addRolesClosed">
      <!--内容主体区域 -->
      <el-form :model="addForm" :rules="addFromRules" ref="roleRuleForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改角色弹窗-->
    <el-dialog
      title="编辑角色"
      :visible.sync="editRolesVisible"
      width="50%" @close="editRolesClosed">
      <!--内容主体区域 -->
      <el-form :model="editForm" :rules="addFromRules" ref="editRoleRuleForm" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditRole">确 定</el-button>
      </span>
    </el-dialog>
    <!--分配权限弹窗-->
    <el-dialog
      title="分配权限"
      :visible.sync="distributeDialogVisible"
      width="50%" @close="clearData">
      <el-tree :data="rightsList" :props="defaultProps"
               :default-expand-all="true" node-key="id"
               :show-checkbox="true" ref="treeRef"
               :default-checked-keys="defcheckKey"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="distributeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesListInfo,
  addRoleInfo,
  deleteRoleInfo,
  getEditRoleInfo,
  saveEditRoleInfo,
  deleteRoleRightInfo,
  getRightListInfo,
  allotRightInfo,
} from "network/roles";

export default {
  name: "Roles",
  data() {
    return {
      rolesList: [],
      rightsList:[],
      addRolesVisible: false,
      editRolesVisible: false,
      distributeDialogVisible:false,
      addForm: {
        roleName: '',
        roleDesc: '',
      },
      addFromRules: {
        roleName: [{required: true, message: '请输入角色名', trigger: 'blur'},
          {min: 3, max: 10, message: '角色名在3-10个字符之间', trigger: 'blur'}],
        roleDesc: [{required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 3, max: 10, message: '角色描述在3-10个字符之间', trigger: 'blur'}]
      },
      editForm: {},
      defaultProps:{
        children: 'children',
        label: 'authName'
      },
      defcheckKey:[],
      currentRoleId:'',
    }
  },
  created() {
    this.getRolesListData()
  },
  methods: {
    getRolesListData() {
      getRolesListInfo().then(res => {
        this.rolesList = res.data
      })
    },
    addRolesClosed() {
      this.$refs.roleRuleForm.resetFields()
    },
    addRole() {
      this.$refs.roleRuleForm.validate(valid => {
        if (!valid) return
        this.addRoleData()
      })
    },
    addRoleData() {
      addRoleInfo(this.addForm).then(res => {
        if (res.meta.status !== 201) {
          return this.$message.error('添加角色失败')
        }
        this.addRolesVisible = false
        this.$message.success('添加角色成功')
        this.getRolesListData()
      })
    },
    deleteRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.deleteRoleData(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteRoleData(id) {
      deleteRoleInfo(id).then(res => {
        this.getRolesListData()
      })
    },
    editRole(id) {
      this.editRolesVisible = true
      this.getEditRoleData(id)
    },
    getEditRoleData(id) {
      getEditRoleInfo(id).then(res => {
        this.editForm = res.data
      })
    },
    editRolesClosed() {
      this.$refs.editRoleRuleForm.resetFields()
    },
    saveEditRole() {
      this.$refs.editRoleRuleForm.validate(valid => {
        if (!valid) return
        this.saveEditRoleData()
      })
    },
    saveEditRoleData() {
      console.log(this.editForm);
      let data = {
        roleId: this.editForm.roleId,
        roleName: this.editForm.roleName,
        roleDesc: this.editForm.roleDesc,
      }
      saveEditRoleInfo(data).then(res => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error('角色信息修改失败')
        }
        this.$message.success('角色信息修改成功')
        this.editRolesVisible = false
        this.getRolesListData()
      })
    },
    deleteRightById(role, rightId) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.deleteRoleRightData(role, rightId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteRoleRightData(role, rightId) {
      deleteRoleRightInfo(role.id, rightId).then(res => {
        console.log(res);
        //这里不建议整个进行更新
        // this.getRolesListData()
        role.children = res.data
      })
    },
    distributeDialog(role){
      this.currentRoleId = role.id
      this.getLeafKeys(role,this.defcheckKey)
      this.getRightListData()
      this.distributeDialogVisible = true
    },
    //点击分配权限按钮之后获取权限列表数据
    getRightListData(){
      getRightListInfo().then(res=>{
        this.rightsList = res.data;
      })
    },
    //递归获取角色三级权限的id
    getLeafKeys(node,arr){
      //如果节点没有children属性了则将三级权限的id保存下来
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafKeys(item,arr))
    },
    //监听分配权限对话框的关闭事件
    clearData(){
      // 弹窗关闭之后清空上一次勾选的状态
      this.defcheckKey = []
    },
    //点击为角色分配权限
    allotRights(){
      const keys = [...this.$refs.treeRef.getCheckedKeys(),
                    ...this.$refs.treeRef.getHalfCheckedKeys()];
      //将keys的每一个值赋给idStr，并用英文的逗号隔开
      const idStr = keys.join(',')
      this.allotRightData(idStr)
      this.distributeDialogVisible = false
    },
    allotRightData(idStr){
      allotRightInfo(this.currentRoleId,idStr).then(res =>{
        //刷新权限列表
        this.getRolesListData()
      })
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}

.el-tag {
  margin: 10px
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}
</style>
