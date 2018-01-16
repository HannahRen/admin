<template>
<div class="page-edit">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-table">
    <el-row>
      <!-- <el-col :span="8">
        <el-form-item label="创建者" prop="creator">
          <el-input v-model="ruleForm.creator" placeholder="创建者"></el-input>
        </el-form-item>
      </el-col> -->
      <el-col :span="8">
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="推荐" prop="recommend">
          <el-select v-model="ruleForm.recommend" placeholder="推荐">
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
      <el-col :span="8">
        <el-form-item label="背景图" prop="thumbnail">
          <upload-cos :inputModel="ruleForm.thumbnail" v-model="ruleForm.thumbnail" placeholder="背景图" dimension="285*160"></upload-cos>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="标题"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="关键词" prop="keyword">
          <el-input v-model="ruleForm.keyword" placeholder="关键词"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc" placeholder="描述" type="textarea" :autosize="{ minRows: 2 }"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="备注" prop="note">
          <el-input v-model="ruleForm.note" placeholder="备注" type="textarea" :autosize="{ minRows: 2 }"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="正文" prop="content">
          <tencent-quill-editor v-model="ruleForm.content"></tencent-quill-editor>
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
import TencentQuillEditor from '~/components/framework/TencentQuillEditor';
export default {
  name: 'activity-edit',
  components: {
    TencentQuillEditor
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
        path: '/activity',
        title: '活动管理'
      },
      {
        path: '/activity/edit?id=' + id,
        title: '活动编辑'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    const initForm = {
      _id: id,
      title: '',
      content: '',
      creator: ctx.userinfo.username,
      thumbnail: '',
      desc: '',
      status: '1',
      note: '',
      keyword: '',
      recommend: '0',
      editorOption: {},
      meta: {
        createAt: '',
        updateAt: ''
      }
    };
    let ruleForm = initForm;
    return {
      _id: id,
      initForm: initForm,
      ruleForm: ruleForm,
      rules: {
        title: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }
        ],
        creator: [
          {
            required: true,
            message: '请输入创建人',
            trigger: 'blur'
          }
        ],
        // content: [{
        //   required: true,
        //   message: '请输入正文',
        //   trigger: 'blur'
        // }],
        thumbnail: [
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
        let url = '/activity/' + id;
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
      let url = '';
      url = '/activity/save';
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
        path: '/activity/detail',
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
