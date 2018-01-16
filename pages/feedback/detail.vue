<template>
<div class="page-detail">
  <el-form :model="ruleForm" label-width="100px" class="detail-table">
    <el-row>
      <el-col :span="8">
        <el-form-item label="内容"> <span v-text="ruleForm.content"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="类型"> <span v-text="ruleForm.type"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="邮箱"> <span v-text="ruleForm.email"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建日期"> <span v-text="ruleForm.meta.createAt"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="状态"> <span v-text="ruleForm.status"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机号码"> <span v-text="ruleForm.mobile"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="图片url"> <span v-text="ruleForm.pic"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="预览">
          <img :src="ruleForm.pic">
        </el-form-item>
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

    <el-button type="primary" @click="editRow()">标记完成</el-button>

    <el-button @click="goBack()">返 回</el-button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios';
import momentUtil from '~/utils/moment-util';
export default {
  name: 'banner-detail',
  asyncData(ctx) {
    axios.ctx = ctx;
    const id = ctx.query.id;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/feedback',
        title: '意见反馈'
      },
      {
        path: '/banner/edit?id=' + id,
        title: '查看'
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
      let url = '/feedback/' + id;
      axios.get(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let body = result.data;

        if (body.status === 0) {
          body.status = '已解决';
        } else {
          body.status = '未解决';
        }

        switch (Number(body.type)) {
          case 0:
            body.type = '网站建议';
            break;
          case 1:
            body.type = '服务优化';
            break;
          case 2:
            body.type = '表扬一下';
            break;
          case 3:
            body.type = '其他';
            break;
          default:
            body.type = '无类型';
        }
        body.status = body.status + '';
        body.meta.createAt = momentUtil.formatDate(body.meta.createAt);
        that.ruleForm = body;
      });
    },
    editRow() {
      let that = this;
      that
        .$confirm('此操作将任务标记完成, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let id = this.ruleForm._id;
          that.onEditDo(id);
        })
        .catch(() => {});
    },
    onEditDo(id) {
      let that = this;
      let url = `/feedback/status/${id}`;
      axios.put(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        that.$message.success('成功（已解决）!');
        that.loadData();
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
