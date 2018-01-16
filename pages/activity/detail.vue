<template>
<div class="page-detail">
  <el-form :model="ruleForm" label-width="100px" class="detail-table">
    <el-row>
      <el-col :span="8">
        <el-form-item label="创建者"> <span v-text="ruleForm.creator"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态" prop="status"><span v-text="ruleForm.status"></span></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="推荐" prop="recommend"><span v-text="ruleForm.recommend"></span></el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="创建日期"> <span v-text="ruleForm.meta.createAt"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="标题"> <span v-text="ruleForm.title"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="背景图"> <span v-text="ruleForm.thumbnail"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="描述"> <span v-text="ruleForm.desc"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="关键词"> <span v-text="ruleForm.keyword"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="备注"> <span v-text="ruleForm.note"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="正文"> <span v-html="ruleForm.content"></span> </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div class="page-button">
    <el-button type="primary" @click="goEdit()">编 辑</el-button>
    <el-button @click="goBack()">返 回</el-button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios'
import momentUtil from '~/utils/moment-util'
export default {
  name: 'activity-detail',
  asyncData(ctx) {
    axios.ctx = ctx
    const id = ctx.query.id
    const initForm = {
      _id: id,
      title: '',
      content: '',
      creator: '',
      thumbnail: '',
      desc: '',
      status: '0',
      note: '',
      keyword: '',
      recommend: '0',
      meta: {
        createAt: '',
        updateAt: ''
      }
    }
    return {
      newPassword: '',
      initForm: initForm,
      ruleForm: initForm
    }
  },
  created: function() {
    this.loadData()
  },
  methods: {
    loadData() {
      let that = this
      let id = this.ruleForm._id
      let url = '/activity/' + id
      axios.get(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message)
          return
        }
        let body = result.data
        if (body.status === 1) {
          body.status = '正常'
        } else {
          body.status = '停用'
        }
        body.status = body.status + ''
        body.meta.createAt = momentUtil.formatDate(body.meta.createAt)
        that.ruleForm = body
      })
    },
    goEdit() {
      let that = this
      that.$router.push({
        path: '/activity/edit',
        query: {
          id: that.ruleForm._id
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    goChangePsdDo(id) {
      let that = this
      let url = `/activity/changePsd/${id}`
      axios.put(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message)
          return
        }
        let body = result.data
        that.newPassword = body
      })
    }
  }
}
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
