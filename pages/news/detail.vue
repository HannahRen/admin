<template>
<div class="page-detail">
  <el-form :model="ruleForm" label-width="100px" class="detail-table">
    <el-row>
      <el-col :span="20">
        <el-form-item label="标题"><el-input v-model="ruleForm.title" placeholder="标题" disabled type="textarea" :autosize="{ minRows: 1}"></el-input></el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="描述"><el-input v-model="ruleForm.desc" placeholder="描述" disabled type="textarea" :autosize="{ minRows: 1}"></el-input></el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="关键词"><el-input v-model="ruleForm.keyword" placeholder="关键词" disabled type="textarea" :autosize="{ minRows: 1}"></el-input></el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="正文"><el-input v-model="ruleForm.content" placeholder="正文" disabled type="textarea" :autosize="{ minRows: 1}"></el-input></el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20">
        <el-form-item label="备注"><el-input v-model="ruleForm.comment" placeholder="备注" disabled type="textarea" :autosize="{ minRows: 1}"></el-input></el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="创建者"><el-input v-model="ruleForm.creator" placeholder="创建者" disabled></el-input></el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="状态">
          <el-select v-model="ruleForm.status" placeholder="状态" disabled>
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="是否置顶">
          <el-select v-model="ruleForm.top" placeholder="置顶" disabled>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="创建日期"><el-input v-model="ruleForm.meta.createAt" placeholder="创建日期" disabled></el-input></el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="修改日期"><el-input v-model="ruleForm.meta.updateAt" placeholder="修改日期" disabled></el-input></el-form-item>
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
  name: 'new-detail',
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
        path: '/news/detail?id=' + id,
        title: '资讯编辑'
      }
    ]
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson)
    const initForm = {
      _id: id,
      title: '',
      content: '',
      creator: '',
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
    return {
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
      let url = '/news/' + id
      axios.get(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message)
          return
        }
        result.data.status = String(result.data.status)
        result.data.top = String(result.data.top)
        result.data.meta.createAt = momentUtil.formatDate(result.data.meta.createAt)
        result.data.meta.updateAt = momentUtil.formatDate(result.data.meta.updateAt)
        that.ruleForm = result.data
      })
    },
    goEdit() {
      let that = this
      that.$router.push({
        path: '/news/edit',
        query: {
          id: that.ruleForm._id
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
