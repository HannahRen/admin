<template>
<el-col :span="3" class="nav">
  <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose">
    <el-submenu v-for="(item, index) in menus" :key="index" :index="String(index)">
      <template slot="title"><i class="el-icon-menu"></i>{{item.title}}</template>
      <el-menu-item v-for="(subItem, subIndex) in item.children" :key="index + subIndex" :index="String(index + subIndex)">
        <nuxt-link :to="subItem.url" class="button--green default">{{subItem.title}}</nuxt-link>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</el-col>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goMain(url) {
      var that = this;
      that.$router.push({
        path: url
      });
    }
  },
  data() {
    return {
      menus: [
        {
          title: '用户中心',
          children: [
            {
              title: '用户信息',
              url: '/user'
            }
          ]
        },
        {
          title: '客服',
          children: [
            {
              title: '意见反馈',
              url: '/feedback'
            }
          ]
        },
        {
          title: '胡莱官网',
          children: [
            {
              title: '游戏管理',
              url: '/game'
            },
            {
              title: '活动管理',
              url: '/activity'
            },
            {
              title: 'banner管理',
              url: '/banner'
            },
            {
              title: '资讯列表',
              url: '/news'
            },
            {
              title: '焦点图',
              url: '/carousel'
            }
          ]
        },
        {
          title: '胡莱组件',
          children: [
            {
              title: '富文本',
              url: '/framework/quillEditor'
            },
            {
              title: 'upload测试',
              url: '/framework/uploadTest'
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.nav {
    height: 100%;
    background-color: #eef1f6;
}
</style>
