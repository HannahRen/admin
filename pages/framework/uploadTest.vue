<template>
<div class="page-edit">
  <p>Test1:</p>
  <p>Test2:</p>
  <upload-input :inputModel="portrait" v-model="portrait" placeholder="头像"></upload-input>
  <upload-cos :inputModel="cosfile" v-model="cosfile" placeholder="图片"></upload-cos>
  <div class="page-button">
    <el-button @click="goBack()">返 回</el-button>
  </div>
</div>
</template>
<script>
export default {
  name: 'upload-test',
  asyncData(ctx) {
    const breadcrumbJson = [{
        path: '/',
        title: '首页'
      },
      {
        path: '/framework',
        title: '胡莱组件'
      },
      {
        path: '/framework/uploadTest',
        title: 'upload测试'
      }
    ]
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson)
    return {
      portrait: '',
      cosfile: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>
