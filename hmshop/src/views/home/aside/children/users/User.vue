<template>
  <div>
    <!--  面包屑区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域-->
    <el-card>
      <!--搜索与添加区域-->
      <!-- gutter:每一列之间的空隙
           span:每一列的宽度
           clearable:清空文本框
           @clear事件在点击由 clearable 属性生成的清空按钮时触发-->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserListData">
            <el-button slot="append" icon="el-icon-search" @click="getUserListData"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUserVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!--用户列表区域-->
      <!-- border属性:添加边框
           stripe属性:斑马纹也就是隔行变色-->
      <el-table :data="userList" border stripe>
        <!-- type=index表示这一列为索引列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- scope.row可以拿到这一行的数据-->
            <el-switch
              v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" class="option">
          <template slot-scope="scope">
            <!-- 修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="small"
                       @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteUser(scope.row.id)"></el-button>
            <!-- 分配角色按钮
            el-tooltip属性：提示信息
            enterable属性：鼠标一旦离开按钮，就隐藏提示信息-->
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">分配角色</div>
              <el-button type="warning" icon="el-icon-setting" size="small" @click="allotRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域
         layout属性表示分页中显示哪些功能，比如total表示显示数据总数 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-sizes="[1,2,5,10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes,prev, pager, next , jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!--添加用户的弹窗-->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserVisible"
      width="50%" @close="addUserClosed">
      <!--内容主体区域 -->
      <el-form :model="addForm" :rules="addFromRules" ref="ruleForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户的弹窗-->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editUserVisible"
      width="50%" @close="editUserClosed">
      <el-form :model="editForm" :rules="addFromRules" ref="editRuleForm" label-width="70px">
        <!-- 这里用户名不需要校验规则，因此不用加prop-->
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEditUserInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!--分配角色弹窗-->
    <el-dialog
      title="分配角色"
      :visible.sync="allotRoleDialogVisible"
      width="50%" @close="setRoleDialogClosed">
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>分配新的角色：
          <el-select v-model="selectRoleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :label="item.roleName"
              :key="item.id" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="allotRoleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAllotRole">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  setUserInfo,
  addUserInfo,
  editUserInfo,
  commitEditUser,
  deleteUserInfo,
  getRloesListInfo,
  confirmAllotRoleInfo,
} from "network/home";

export default {
  name: "User",
  created() {
    this.getUserListData()
  },
  data() {
    //验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        //邮箱合法
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }

    //验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      //验证手机号的正则表达式
      const regMobile = /^(0|86｜17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        //邮箱合法
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2
      },
      //添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      //添加用户的规则对象
      //trigger:表示触发验证的时机，blur表示失去焦点时触发验证
      addFromRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名的长度在3～10个字符之间', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail, trigger: 'blur'}],
        mobile: [{required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}],
      },
      //查询到的用户信息对象
      editForm: {},
      userList: [],
      roleList:[],
      total: 0,//用户总数
      userInfo: {},
      addUserVisible: false,
      editUserVisible: false,
      allotRoleDialogVisible: false,
      selectRoleId:'',
      userId:'',
    }
  },
  methods: {
    //获取用户列表
    getUserListData() {
      getUserList(this.queryInfo).then(res => {
        //获取数据失败
        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败')
        }
        this.userList = res.data.users;
        this.total = res.data.total;
      })
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserListData()
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getUserListData()
    },
    //监听 switch 开关状态的改变
    userStateChanged(userInfo) {
      this.setInfoData(userInfo)
    },
    //修改用户状态
    setInfoData(userInfo) {
      setUserInfo(userInfo).then(res => {
        if (res.meta.status !== 200) {
          //虽然在数据修改失败，但是在页面上却修改成功，所以要取反回到修改之前的状态
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error('更新用户状态失败')
        }
        this.$message.success('更新用户状态成功！')
      })
    },
    //添加用户弹窗关闭后，清空弹窗内容
    addUserClosed() {
      this.$refs.ruleForm.resetFields()
    },
    //编辑弹窗关闭后，重置弹窗
    editUserClosed() {
      this.$refs.editRuleForm.resetFields()
    },
    //添加用户
    addUser() {
      this.$refs.ruleForm.validate(valid => {
        //信息校验失败
        if (!valid) return
        //信息校验成功可以发送添加用户的网络请求
        this.addUserData();
      })
    },
    //添加用户数据
    addUserData() {
      addUserInfo(this.addForm).then(res => {
        console.log(res);
        if (res.meta.status !== 201) {
          return this.$message.error('用户添加失败')
        }
        this.$message.success('添加用户成功')
        //添加成功之后隐藏添加的对话框
        this.addUserVisible = false
        //重新获取用户列表
        this.getUserListData()
      })
    },
    //展示编辑用户的弹窗
    showEditDialog(id) {
      this.editUserVisible = true
      this.editUserData(id)
    },
    //获取要编辑用户的信息
    editUserData(id) {
      editUserInfo(id).then(res => {
        this.editForm = res.data
      })
    },
    //修改用户信息后提交
    saveEditUserInfo() {
      this.$refs.editRuleForm.validate(valid => {
        if (!valid) return
        //数据校验通过，发起修改用户信息的请求
        this.commitEditUserData()
      })
    },
    //提交修改后的用户信息
    commitEditUserData() {
      let data = {
        id: this.editForm.id,
        email: this.editForm.email,
        mobile: this.editForm.mobile
      }
      commitEditUser(data).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('用户信息修改失败')
        }
        //关闭弹窗
        this.editUserVisible = false
        //提示用户信息修改成
        this.$message.success('用户信息修改成功')
        //再次请求用户信息
        this.getUserListData()
      })
    },
    deleteUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.deleteUserData(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteUserData(id) {
      deleteUserInfo(id).then(res => {
        this.getUserListData()
      })
    },
    //展示分配角色弹窗
    allotRole(userInfo) {
      this.getRolesInfoData()
      this.userInfo = userInfo
      this.userId = userInfo.id
      this.allotRoleDialogVisible = true
    },
    getRolesInfoData(){
      getRloesListInfo().then(res =>{
        this.roleList = res.data
        console.log(res);
      })
    },
    confirmAllotRole(){
      this.confinrAllotRoleData()
      this.allotRoleDialogVisible = false
    },
    confinrAllotRoleData(){
      confirmAllotRoleInfo(this.userId,this.selectRoleId).then(res=>{
        if(res.meta.status!==200){
          return this.$message.error('修改用户角色失败')
        }
        this.$message.success('修改用户角色成功');
        //更新用户信息
        this.getUserListData()
        console.log(res);
      })
    },
    //弹窗关闭后清空下拉框，上次选择的数据
    setRoleDialogClosed(){
      this.selectRoleId = '';
      this.userInfo = {};
    }
  }
}
</script>

<style scoped>

</style>
