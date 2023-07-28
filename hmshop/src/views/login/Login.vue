<template>
  <div class="login_container">

    <div class="login_box">
      <!--头像区域  -->
      <div class="avatar_box">
        <img src="~assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域-->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormT" label-width="0px" class="login_form">
        <!-- 用户名-->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="用户名"
            ></el-input>
        </el-form-item>
        <!-- 密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            placeholder="密码"
            type="password" ></el-input>
        </el-form-item>
        <!-- 按钮区域-->
        <el-form-item class="btn">
          <el-button type="primary" @click="login" >登录</el-button>
          <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import {LoginForm} from "../../network/login";

export default {
  name: "Login",
  data(){
    return {
      //这是登录表单的数据绑定对象
      loginForm:{
        username:'admin',
        password:'123456',
      },
      //这是表单的验证规则对象
      loginFormRules:{
        //验证用户名是否合法
        username:[
          //required 表示该栏目是必填项，trigger：表示当鼠标失去焦点的时候
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
      },
      msg:'',
    }
  },
  methods:{
    //点击重置按钮重置表单
    resetLoginFrom(){
      this.$refs.loginFormT.resetFields()
    },
    login(){
      //点击登录之后验证表单输入内容是否合法(预校验)
      this.$refs.loginFormT.validate(valid =>{
        if(valid){
          this.LoginFormData()
        }
        else return;
      })
    },
    LoginFormData(){
      LoginForm(this.loginForm).then(res=>{
        // console.log(res);
        this.msg = res.meta.msg//拿到返回的提示信息
        if(res.meta.status !== 200){//登录失败
          this.$message({
            message: this.msg,//根据返回的信息进行弹窗提示
            type: "error"
          })
        }else{//登录成功
          // console.log('登录成功');
          this.$message({
            message: this.msg,
            type: "success"
          })
          //1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
          // 1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
          // 1.2 token 只应在当前网站打开期间生效，所以 token
          // 保存在 sessionStorage(会话之间的存储机制，localStorage是持久化的存储机制) 中
          window.sessionStorage.setItem("token",res.data.token)
          this.$router.push('/home')
        }

      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
  position: relative;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  margin:auto;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);

  //less的语法嵌套
  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 12px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form{
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 3px 10px;
  box-sizing: border-box;
}

.btn{
  display: flex;
  //从一行的尾部排列
  justify-content: flex-end;
}
</style>
