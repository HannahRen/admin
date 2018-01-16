<template>
<div class="page-edit">
  <el-row>
    <el-col :span="24">
      <hl-quill-editor v-model="html5Content"></hl-quill-editor>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <tencent-quill-editor v-model="html5Content"></tencent-quill-editor>
    </el-col>
  </el-row>
  <div class="page-button">
    <el-button @click="goBack()">返 回</el-button>
  </div>
</div>
</template>
<script>
import HlQuillEditor from '~/components/framework/QuillEditor'
import TencentQuillEditor from '~/components/framework/TencentQuillEditor'
export default {
  name: 'administrator-edit',
  components: {
    HlQuillEditor,
    TencentQuillEditor
  },
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
        path: '/framework/quillEditor',
        title: '富文本'
      }
    ]
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson)
    return {
      html5Content: '',
      editorOption: {}
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
