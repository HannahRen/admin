<template>
<div class="page-edit">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-table">
    <el-row>
      <el-col :span="8">
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc" placeholder="描述"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="游戏名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="游戏名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="标题"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="logo" prop="logo">
          <upload-cos :inputModel="ruleForm.logo" v-model="ruleForm.logo" placeholder="logo" dimension="252*74"></upload-cos>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="按钮图" prop="button">
          <upload-cos :inputModel="ruleForm.button" v-model="ruleForm.button" placeholder="按钮图" dimension="178*54"></upload-cos>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="背景图url" prop="pic">
          <upload-cos :inputModel="ruleForm.pic" v-model="ruleForm.pic" placeholder="背景图" dimension="1920*1675"></upload-cos>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="缩略图" prop="thumbnail">
          <upload-cos :inputModel="ruleForm.thumbnail" v-model="ruleForm.thumbnail" placeholder="缩略图" dimension="80*60"></upload-cos>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="跳转的地址" prop="url">
          <el-input v-model="ruleForm.url" placeholder="图片名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="状态">
            <el-option label="启用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>

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
  name: 'carousel-edit',
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
        title: '焦点图编辑'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    const initForm = {
      _id: id,
      logo: '',
      name: '',
      title: '',
      desc: '',
      button: '',
      pic: '',
      url: '',
      thumbnail: '',
      status: '0'
    };
    // let ruleForm = initForm;
    return {
      _id: id,
      // initForm: initForm,
      ruleForm: initForm,
      rules: {
        logo: [
          {
            required: true,
            message: '图片必须上传',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '游戏名必填',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '必须填写描述',
            trigger: 'blur'
          }
        ],
        button: [
          {
            required: true,
            message: '按钮必须上传',
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
        thumbnail: [
          {
            required: true,
            message: '请添加缩略图',
            trigger: 'blur'
          }
        ],
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
        let url = '/carousel/' + id;
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
      let url = '/carousel/save';
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
        path: '/carousel/detail',
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
