<template>
<div class="page-edit">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-table">
    <el-row>
      <el-col :span="8">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="邮箱" prop="email" :rules="[
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ]">
          <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机号" prop="mobile" :rules="[
              { pattern: /^1[0-9]{10}$|^[569][0-9]{7}$/, message: '请填写正确的手机号码', trigger: 'blur,change' }
            ]">
          <el-input v-model="ruleForm.mobile" placeholder="手机号"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" v-show="ruleForm._id==='add'">
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="部门" prop="department">
          <el-input v-model="ruleForm.department" placeholder="部门"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position" placeholder="职位"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="头像" prop="portrait">
          <upload-input :inputModel="ruleForm.portrait" v-model="ruleForm.portrait" placeholder="头像" dimension="40*40"></upload-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="状态">
            <el-option label="正常" value="0"></el-option>
            <el-option label="冻结" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="page-button">
    <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
    <el-button @click="goBack()">返 回</el-button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios';
import _forEach from 'lodash/forEach';
export default {
  name: 'administrator-edit',
  head() {
    return {
      title: '系统用户编辑' + this.$store.app.head.title
    };
  },
  asyncData(ctx) {
    axios.ctx = ctx;
    const id = ctx.query.id;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/administrator',
        title: '系统账号'
      },
      {
        path: '/administrator/edit?id=' + id,
        title: '系统编辑'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    const initForm = {
      _id: id,
      email: '',
      mobile: '',
      password: '',
      username: '',
      portrait: '',
      status: '0',
      point: '',
      lastIP: '',
      department: '',
      position: ''
    };
    let ruleForm = initForm;
    return {
      _id: id,
      initForm: initForm,
      ruleForm: ruleForm,
      html5Content: '',
      editorOption: {},
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入用户密码',
            trigger: 'blur'
          }
        ],
        department: [
          {
            required: true,
            message: '请输入部门',
            trigger: 'blur'
          }
        ],
        position: [
          {
            required: true,
            message: '请输入职位',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let that = this;
      let id = this.ruleForm._id;
      if (id !== 'add') {
        let url = '/administrator/' + id;
        axios.get(url).then(function(result) {
          if (result.code !== 0) {
            that.$message.error(result.message);
            return;
          }
          let body = result.data;
          body.status = body.status + '';
          that.ruleForm = body;
        });
      }
    },
    changeContent(val) {
      this.html5Content = val;
    },
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        that.submitFormDo();
      });
    },
    submitFormDo() {
      let that = this;
      let params = {};
      _forEach(that.ruleForm, function(val, key) {
        params[key] = val;
      });
      let url = '';
      url = '/administrator/save';
      axios.post(url, params).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let body = result.data;
        body.status = body.status + '';
        that.ruleForm = body;
        that.$message.success('保存成功!');
        that.goDetail();
      });
    },
    goDetail() {
      let that = this;
      that.$router.push({
        path: '/administrator/detail',
        query: {
          id: that.ruleForm._id
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 30px;
}

.quill-editor {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
