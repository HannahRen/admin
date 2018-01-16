<template>
<div class="page-detail">
  <el-form :model="ruleForm" label-width="100px" class="detail-table">
    <el-row>
      <el-col :span="8">
        <el-form-item label="创建人"> <span v-text="ruleForm.creator"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建日期"> <span v-text="ruleForm.meta.createAt"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="修改日期"> <span v-text="ruleForm.meta.updateAt"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="logo"> <span v-text="ruleForm.logo"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="游戏名"> <span v-text="ruleForm.name"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="标题"> <span v-text="ruleForm.title"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="描述"> <span v-text="ruleForm.desc"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="按钮图"> <span v-text="ruleForm.button"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="背景图url"> <span v-text="ruleForm.pic"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="缩略图"> <span v-text="ruleForm.thumbnail"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="跳转的地址"> <span v-text="ruleForm.url"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态"> <span v-text="ruleForm.status"></span> </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="8">
        <el-form-item label="最后登录IP"> <span v-text="ruleForm.lastIP"></span> </el-form-item>
      </el-col>
    </el-row> -->
  </el-form>
  <!-- <div class="showpassword" v-show="newPassword"> 重置的密码为: {{newPassword}} </div> -->

  <div class="page-button">

    <el-button type="primary" @click="goEdit()">编 辑</el-button>

    <!-- <el-button @click="goChangePsd()">重置密码</el-button> -->

    <el-button @click="goBack()">返 回</el-button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios';
import momentUtil from '~/utils/moment-util';
export default {
  name: 'carousel-detail',
  asyncData(ctx) {
    axios.ctx = ctx;
    const id = ctx.query.id;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/carousel',
        title: '焦点图管理'
      },
      {
        path: '/carousel/edit?id=' + id,
        title: '焦点图详情'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    const initForm = {
      _id: id,
      meta: {
        createAt: '',
        updateAt: ''
      }
    };
    return {
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
      let url = '/carousel/' + id;
      axios.get(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let body = result.data;
        if (body.status === 0) {
          body.status = '启用';
        } else {
          body.status = '停用';
        }
        body.status = body.status + '';
        body.meta.createAt = momentUtil.formatDate(body.meta.createAt);
        body.meta.updateAt = momentUtil.formatDate(body.meta.updateAt);
        that.ruleForm = body;
      });
    },
    goEdit() {
      let that = this;
      that.$router.push({
        path: '/carousel/edit',
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
.showpassword {
  color: red;
  font-size: 18px;
}

.card {
  margin-bottom: 30px;
}
</style>
