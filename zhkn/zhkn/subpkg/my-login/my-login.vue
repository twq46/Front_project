<template>
  <view class="login-boxT">
    <view class="login-box">
      <view class="login-title">
        <text>手机号登录/注册</text>
      </view>
      <!-- 手机号区域 -->
      <view class="login-phone">
        <text>手机号</text>
        <input type="text" placeholder="请输入手机号">
      </view>
      <!-- 验证码区域 -->
      <view class="login-verify">
        <view class="login-verify-text">
          <text>验证码</text>
        </view>
        <view class="login-verify-btn">
          <input type="text" placeholder="请输入验证码">
          <button class="sendcode">发送验证码</button>
        </view>
      </view>
      <!-- 协议 -->
      <view class="protocol">
        <!-- 复选按钮 -->
        <label class="radio">
          <view class="">
            <radio value="" />
          </view>
          <view class="">
            <text>注册表示你已阅读并同意《中选志愿用户服务协议》与《中选志愿用户隐私服务协议》</text>
          </view>
          
        </label>
      </view>
      <!-- 确认按钮 -->
      <view class="login-confirm">
        <button>确认</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
.login-boxT{
  display: flex;
  justify-content: center;
  .login-box{
    width: 80%;
    padding-top: 100px;
    .login-title{
      font-size: 25px;
      font-weight: bold;
    }
    .login-phone{
      margin-top: 30px;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 20px;
      text{
        display: block;
        font-weight: bold;
        margin: 10px 0;
      }
    }
    .login-verify{
      margin: 20px 0;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 20px;
      .login-verify-text{
        margin-bottom: 15px;
        text{
          display: block;
          font-weight: bold;
        }
      }
      .login-verify-btn{
        display: flex;
        align-items: center;
        .sendcode{
          color: #999999;
          font-size: 15px;
          background-color: #fff;
          border:1px solid #e6e6e6;
          border-radius: 50px;
        }
      }
    }
    .protocol{
      margin-bottom: 40px;
      .radio{
        display: flex;
        align-items: center;
      }
    }
    .login-confirm{
      button{
        width: 90%;
        color: #fff;
        border-radius: 50px;
        background-color: #ee7a51;
      }
    }
  }
  
}

</style>
