<template>
<div class="page-detail">
  <el-form :model="ruleForm" label-width="100px" class="detail-table">
    <el-row>
      <el-col :span="8">
        <el-form-item label="游戏名称"> <span v-text="ruleForm.name"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="官网地址"> <span v-text="ruleForm.officalWebsite"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下载地址"> <span v-text="ruleForm.downloadAddress"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="推荐"> <span v-text="ruleForm.recommend"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="排序"> <span v-text="ruleForm.sorting"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="排名"> <span v-text="ruleForm.ranking"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="状态"> <span v-text="ruleForm.status"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建日期"> <span v-text="ruleForm.meta.createAt"></span> </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="创建人"> <span v-text="ruleForm.creator"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="展现图"> <span v-text="ruleForm.thumbnail"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="缩略图"> <span v-text="ruleForm.gameIcon"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="hover图"> <span v-text="ruleForm.headerPic"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="描述"> <span v-text="ruleForm.desc"></span> </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注"> <span v-text="ruleForm.note"></span> </el-form-item>
      </el-col>
    </el-row>
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
import axios from '~/plugins/axios'
import momentUtil from '~/utils/moment-util'
export default {
  name: 'administrator-detail',
  asyncData(ctx) {
    axios.ctx = ctx
    const id = ctx.query.id
    const breadcrumbJson = [{
        path: '/',
        title: '首页'
      },
      {
        path: '/game',
        title: '游戏管理'
      },
      {
        path: '/game/edit?id=' + id,
        title: '游戏详情'
      }
    ]
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson)
    const initForm = {
      _id: id,
      name: '',
      desc: '',
      thumbnail: '',
      gameIcon: '',
      officalWebsite: '',
      downloadAddress: '',
      creator: '',
      status: '',
      sorting: '',
      recommend: '',
      ranking: '',
      note: '',
      meta: {
        createAt: '',
        updateAt: ''
      }
    }
    return {
      // newPassword: '',
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
      let url = '/game/' + id
      axios.get(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message)
          return
        }
        let body = result.data
        if (body.status === 1) {
          body.status = '启用'
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
        path: '/game/edit',
        query: {
          id: that.ruleForm._id
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    }
    // goChangePsd() {
    //   let that = this
    //   that
    //     .$confirm('确定重置此用户的密码?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     })
    //     .then(() => {
    //       that.goChangePsdDo(that.ruleForm._id)
    //     })
    //     .catch(() => {})
    // },
    // goChangePsdDo(id) {
    //   let that = this
    //   let url = `/administrator/changePsd/${id}`
    //   axios.put(url).then(function(result) {
    //     if (result.code !== 0) {
    //       that.$message.error(result.message)
    //       return
    //     }
    //     let body = result.data
    //     that.newPassword = body
    //   })
    // }
  }
}
</script>

<style scoped>
/*.showpassword {
  color: red;
  font-size: 18px;
}

.card {
  margin-bottom: 30px;
}*/
</style>
