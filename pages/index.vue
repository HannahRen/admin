<template>
<section class="container">
  <div>
    <h1 class="title">
          胡莱游戏
      </h1>
    <h2 class="subtitle">
          hoolai games
        </h2>
    <!-- <div class="links">
      <nuxt-link to="/login" class="button--green default">新登录</nuxt-link>
      <nuxt-link to="/about" class="button--green default">关于我们</nuxt-link>
      <nuxt-link to="/users" class="button--green default">用户列表</nuxt-link>
      <nuxt-link to="/admin/login" class="button--green default">后台管理</nuxt-link> <a href="https://nuxtjs.org/" target="_blank" class="button--green">nuxt.js 文档</a> <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
    </div> -->
  </div>
</section>
</template>

<script>
import axios from '~/plugins/axios';
export default {
  head() {
    return {
      title: '首页' + this.$store.app.head.title
    };
  },
  asyncData(ctx) {
    console.log('asyncData', ctx.env);
    axios.ctx = ctx;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {}
  }
};
</script>

<style scoped lang="scss">
.container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #fff;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
    .default {
        margin-right: 20px;
    }
}
</style>
