<template>
<div class="page-edit">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-table">
    <el-row>
      <el-col :span="6">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="标题"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="跳转的地址" prop="url">
          <el-input v-model="ruleForm.url" placeholder="图片名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="图片位置" prop="location">
          <el-select v-model="ruleForm.location" placeholder="图片位置">
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="状态">
            <el-option label="启用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="图片" prop="pic">
          <upload-cos :inputModel="ruleForm.pic" v-model="ruleForm.pic" placeholder="图片" dimension="235*187 - 489*187"></upload-cos>
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
  name: 'banner-edit',
  asyncData(ctx) {
    axios.ctx = ctx;
    const id = ctx.query.id;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/banner',
        title: 'banner管理'
      },
      {
        path: '/banner/edit?id=' + id,
        title: 'banner编辑'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    const initForm = {
      _id: id,
      title: '',
      content: '',
      thumbnail: '',
      decs: '',
      status: '0',
      note: '',
      pic: '',
      url: '',
      location: ''
    };
    // let ruleForm = initForm;
    return {
      _id: id,
      // initForm: initForm,
      ruleForm: initForm,
      rules: {
        title: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        pic: [
          {
            required: true,
            message: '请添加背景图地址',
            trigger: 'blur'
          }
        ],
        // location: [
        //   {
        //     required: true,
        //     message: '必须填写位置',
        //     trigger: 'blur'
        //   }
        // ],
        url: [
          {
            required: true,
            message: '请添加背景图',
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
        let url = '/banner/' + id;
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
      let url = '/banner/save';
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
        path: '/banner/detail',
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
</style>
