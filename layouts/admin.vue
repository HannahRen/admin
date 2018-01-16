<template>
<div class="admin">
  <h2>管理台的模板</h2>
  <div class="nav">
    <nuxt-link to="/admin/main">首页</nuxt-link>
    <nuxt-link to="/admin/users">用户列表</nuxt-link>
    <div class=""> 欢迎:{{userInfo.username}}sss {{ $store.state.stars }}{{$store.state.counter }}</div>
  </div>
  <nuxt/> </div>
</template>
<script>
import axios from '~/plugins/axios'
export default {
  data() {
    return {
      userInfo: {
        username: ''
      },
      myWebResPower: null
    }
  },
  created() {

  },
  methods: {
    async onSubmit() {
      var that = this;
      let {
        data
      } = await axios.get(that, '/api/center/userInfo')
      console.log(data);
    }
  }
}
</script>

<style scoped lang="scss">
.admin {
    .nav a {
        margin-right: 20px;
    }
}
</style>
