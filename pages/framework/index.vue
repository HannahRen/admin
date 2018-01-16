<template>
<div class="page-list">

</div>
</template>
<script>
export default {
  name: 'administrator-edit',
  asyncData(ctx) {
    const breadcrumbJson = [{
        path: '/',
        title: '首页'
      },
      {
        path: '/framework',
        title: '胡莱组件'
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
