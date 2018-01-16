<template>
<div class="page-edit">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-table">
    <el-row>
      <el-col :span="20">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" placeholder="标题"></el-input>
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
        <el-form-item label="关键词" prop="keyword">
          <el-input v-model="ruleForm.keyword" placeholder="关键词" type="textarea" :autosize="{ minRows: 2 }"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20">
        <el-form-item label="备注" prop="comment">
          <el-input v-model="ruleForm.comment" placeholder="备注" type="textarea" :autosize="{ minRows: 1 }"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="置顶" prop="top">
          <el-select v-model="ruleForm.top" placeholder="置顶">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
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
import axios from '~/plugins/axios'
import _ from 'lodash'
import TencentQuillEditor from '~/components/framework/TencentQuillEditor'
export default {
  name: 'news-edit',
  components: {
    TencentQuillEditor
  },
  asyncData(ctx) {
    axios.ctx = ctx
    const id = ctx.query.id
    const breadcrumbJson = [{
        path: '/',
        title: '首页'
      },
      {
        path: '/news',
        title: '资讯管理'
      },
      {
        path: '/news/edit?id=' + id,
        title: '资讯编辑'
      }
    ]
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson)
    const initForm = {
      _id: id,
      title: '',
      content: '',
      creator: ctx.userinfo.username,
      comment: '',
      desc: '',
      status: '0',
      top: '0',
      keyword: '',
      meta: {
        createAt: '',
        updateAt: ''
      }

    }
    let ruleForm = initForm
    return {
      _id: id,
      initForm: initForm,
      ruleForm: ruleForm,
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }]
        // content: [{
        //   required: true,
        //   message: '请输入正文',
        //   trigger: 'blur'
        // }],
        // desc: [{
        //   required: true,
        //   message: '请输入描述',
        //   trigger: 'blur'
        // }],
        // keyword: [{
        //   required: true,
        //   message: '请输入关键词',
        //   trigger: 'blur'
        // }]
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      let that = this
      let id = this.ruleForm._id
      if (id !== 'add') {
        let url = '/news/' + id
        axios.get(url).then(function(result) {
          if (result.code !== 0) {
            that.$message.error(result.message)
            return
          }
          result.data.status = String(result.data.status)
          result.data.top = String(result.data.top)
          that.ruleForm = result.data
        })
      }
    },
    submitForm(formName) {
      let that = this
      that.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        that.onSubmit()
      })
    },
    onSubmit() {
      let that = this
      let params = {}
      _.forEach(that.ruleForm, function(val, key) {
        params[key] = val
      })
      let url = ''
      url = '/news/save'
      axios.post(url, params).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message)
          return
        }
        result.data.status = String(result.data.status)
        result.data.top = String(result.data.top)
        that.ruleForm = result.data
        that.$message.success({
          message: '保存成功!',
          type: 'success'
        })
        that.$router.push('/news')
        console.log(that.$router)
        // that.goDetail()
      })
    },
    // goDetail() {
    //   let that = this
    //   that.$router.push({
    //     path: '/new/detail',
    //     query: {
    //       id: that.ruleForm._id
    //     }
    //   })
    // },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 30px;
}
</style>
