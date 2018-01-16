<template>
<div class="header">
  <el-row>
    <el-col :span="3">
      <div class="admin-logo">
        <nuxt-link to="/"><img src="/icon.png" alt=""></nuxt-link>
      </div>
    </el-col>

    <el-col :span="21">
      <el-menu theme="dark" :default-active="activeIndex2" class="el-menu-demo header-nav" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <!-- <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu> -->
        <el-menu-item index="3">
          系统账号
        </el-menu-item>
      </el-menu>
      <el-dropdown class="user-info" @command="handleCommand">
        <span class="el-dropdown-link">
          <em class="user-icon">
            <img :src='$store.state.user.userinfo.portrait' alt=""/>
          </em>
          {{$store.state.user.userinfo.username}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</div>
</template>

<script>
import axios from '~/plugins/axios';
import { removeToken } from '~/utils/auth';
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      administrator: {
        username: ''
      }
    };
  },
  created() {
    // this.getUserinfo()
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key === '3') {
        var that = this;
        that.$router.push({
          path: '/administrator'
        });
      }
      console.log(key, keyPath);
    },
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout();
          break;
        case 'changePassword':
          this.changePassword();
          break;
        default:
      }
    },
    async getUserinfo() {
      let that = this;
      let url = '/administrator/userInfo';
      let result = await axios.get(url);
      if (result.code !== 0) {
        that.$message.error(result.message);
        return;
      }
      that.administrator = result.data;
    },
    changePassword() {
      var that = this;
      that.$router.push({
        path: '/center/change-password'
      });
    },
    logout() {
      removeToken();
      let userinfo = null;
      this.$store.commit('user/userinfo', userinfo);

      this.goLogin();
    },
    goLogin() {
      var that = this;
      that.$router.push({
        path: '/login'
      });
    }
  }
};
</script>

<style lang="scss">
.header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #324157;
}
.admin-logo {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    line-height: 60px;
    img {
        height: 100%;
        width: auto;
        vertical-align: middle;
    }
}
.header-nav {
    padding-right: 180px;
}
.user-info {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 60px;
    padding: 0 20px;
    > .el-dropdown-link {
        color: #fff;
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 60px;
        > .user-icon {
            float: left;
            display: inline-block;
            width: 40px;
            height: 100%;
            padding: 10px 0;
            margin-right: 10px;
            > img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }
}
</style>
