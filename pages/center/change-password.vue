<template>
<div class="page-edit change-password-page">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-table">
    <el-row>
      <el-col :span="24">
        <el-form-item label="原密码" prop="password" :rules="[
              { required: true, message: '请输入原密码', trigger: 'blur' },
            ]">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="新密码" prop="newpassword" :rules="[
              { required: true, message: '请输入新密码', trigger: 'blur' },
            ]">
          <el-input type="password" v-model="ruleForm.newpassword" placeholder="新密码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="确认密码" prop="againpassword" :rules="[
              { required: true, message: '请确认密码', trigger: 'blur' },
            ]">
          <el-input type="password" v-model="ruleForm.againpassword" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="page-button">
    <el-button type="primary" @click="submitForm('ruleForm')">修改密码</el-button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios';
export default {
  name: 'center-change-password',
  head() {
    return {
      title: '修改密码' + this.$store.app.head.title
    };
  },
  asyncData(ctx) {
    axios.ctx = ctx;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/center/change-password',
        title: '修改密码'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    const initForm = {
      password: '',
      againpassword: '',
      newpassword: ''
    };
    let ruleForm = initForm;
    return {
      initForm: initForm,
      ruleForm: ruleForm
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        if (that.ruleForm.newpassword !== that.ruleForm.againpassword) {
          that.$message.error('确定密码和新密码不符!');
          return false;
        }
        that.submitFormDo();
      });
    },
    submitFormDo() {
      let that = this;
      let params = {};
      params.password = that.ruleForm.password;
      params.newpassword = that.ruleForm.newpassword;
      let url = '';
      url = '/administrator/changePassword';
      axios.put(url, params).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        that.$message.success('修改密码成功!');
      });
    }
  }
};
</script>

<style scoped>

.change-password-page {
  width: 500px;
  margin: auto;
}
.card {
  margin-bottom: 30px;
}

.quill-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
