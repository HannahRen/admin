<template>
<div class="page-detail">
  <el-form :model="ruleForm" label-width="100px" class="detail-table">
    <el-row>
      <el-col :span="8">
        <el-form-item label="用户名"> <span v-text="ruleForm.username"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="邮箱"> <span v-text="ruleForm.email"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机号"> <span v-text="ruleForm.mobile"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="部门"> <span v-text="ruleForm.department"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="职位"> <span v-text="ruleForm.position"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建日期"> <span v-text="ruleForm.meta.createAt"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="头像"> <span v-text="ruleForm.portrait"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态"> <span v-text="ruleForm.status"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="最后登录IP"> <span v-text="ruleForm.lastIP"></span> </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <div class="showpassword" v-show="newPassword"> 重置的密码为: {{newPassword}} </div>

  <div class="page-button">

    <el-button type="primary" @click="goEdit()">编 辑</el-button>

    <el-button @click="goChangePsd()">重置密码</el-button>

    <el-button @click="goBack()">返 回</el-button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios';
import momentUtil from '~/utils/moment-util';
export default {
  name: 'administrator-detail',
  head() {
    return {
      title: '系统用户详情' + this.$store.app.head.title
    };
  },
  asyncData(ctx) {
    axios.ctx = ctx;
    const id = ctx.query.id;
    const initForm = {
      _id: id,
      email: '',
      mobile: '',
      password: '',
      username: '',
      portrait: '',
      status: '',
      lastIP: '',
      department: '',
      position: '',
      meta: {
        createAt: '',
        updateAt: ''
      }
    };
    return {
      newPassword: '',
      initForm: initForm,
      ruleForm: initForm
    };
  },
  created: function() {
    this.loadData();
  },
  methods: {
    loadData() {
      let that = this;
      let id = this.ruleForm._id;
      let url = '/administrator/' + id;
      axios.get(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let body = result.data;
        body.status = body.status + '';
        body.meta.createAt = momentUtil.formatDate(body.meta.createAt);
        that.ruleForm = body;
      });
    },
    goEdit() {
      let that = this;
      that.$router.push({
        path: '/administrator/edit',
        query: {
          id: that.ruleForm._id
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    goChangePsd() {
      let that = this;
      that
        .$confirm('确定重置此用户的密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          that.goChangePsdDo(that.ruleForm._id);
        })
        .catch(() => {});
    },
    goChangePsdDo(id) {
      let that = this;
      let url = `/administrator/changePsd/${id}`;
      axios.put(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let body = result.data;
        that.newPassword = body;
      });
    }
  }
};
</script>

<style scoped>
.showpassword {
  color: red;
  font-size: 18px;
}

.card {
  margin-bottom: 30px;
}
</style>
