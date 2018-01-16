<template lang="html">
  <div class="login-content">
    <div class="login-box">
      <nuxt-link to="/"><img src="/logo-b.svg" alt=""></nuxt-link>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="labelPosition" label-width="80px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from '~/plugins/axios';
import { setToken } from '~/utils/auth';
export default {
  layout: 'login',
  head() {
    return {
      title: '系统登录' + this.$store.app.head.title
    };
  },
  asyncData(context) {
    return {
      labelPosition: 'top',
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入账号名称',
            trigger: 'blur'
          },
          {
            min: 3,
            message: '最少3位长度',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        that.login();
      });
    },
    async login() {
      let that = this;
      let params = {};
      params.username = that.ruleForm.name;
      params.password = that.ruleForm.password;
      let result = await axios.post('/administrator/login', params);
      if (result.code !== 0) {
        that.$message.error(result.message);
        return;
      }
      setToken(result.data);
      that.getUserinfo();
    },
    getUserinfo() {
      let that = this;
      let url = '/administrator/userInfo';
      axios.get(url).then(result => {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let administrator = result.data;
        that.$store.commit('user/userinfo', administrator);
        that.goMain();
      });
    },
    goMain() {
      let that = this;
      that.$router.push({
        path: '/'
      });
    }
  }
};
</script>

<style lang="scss">
.login-box {
    margin-bottom: 16px;
}
.login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 400px;
    height: 300px;
    padding: 30px;
    border-radius: 10px;
    background-color: #fff;
}
</style>
