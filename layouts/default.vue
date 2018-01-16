<template>
<div class="wrap">
  <AdminHeader/>
  <el-row class="main">
    <AdminNav/>
    <el-col :span="21" class="content">
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="item.path">{{item.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <nuxt/>
    </el-col>
  </el-row>
</div>
</template>

<script>
import AdminHeader from '~/components/AdminHeader.vue';
import AdminNav from '~/components/AdminNav.vue';
export default {
  middleware: ['user-filter', 'auth'],
  components: {
    AdminHeader,
    AdminNav
  },
  computed: {
    breadcrumb() {
      // console.log(this.$store.state.breadcrumb.breadcrumb);
      return this.$store.state.breadcrumb.breadcrumb;
    }
  }
};
</script>

<style lang="scss">
.wrap {
    width: 100%;
    height: 100%;
    padding-top: 60px;
    position: relative;
    overflow: hidden;
}

.main {
    height: 100%;
    overflow: hidden;
}

.content {
    height: 100%;
    overflow: auto;
    padding: 20px;
    background-color: #f5f5f5;
}

.bread {
    margin-bottom: 20px;
}
.page-list {

    .list-header {
        background-color: #eef1f6;
        .list-tools-button {
            padding-top: 15px;
            .tools-left {
                display: inline-block;
                width: 50%;
                text-align: left;
                padding-left: 10px;
            }
            .tools-right {
                display: inline-block;
                width: 50%;
                text-align: right;
                padding-right: 10px;
            }
        }
    }
    /* list 通用样式 */

    .list-search-form {
        padding-top: 5px;
        text-align: left;
        padding-left: 10px;
        padding-right: 10px;
    }

    .list-table-grid {
        width: 100%;
        min-height: 450px;
    }

    .list-pagination {
        padding-top: 10px;
        text-align: center;
    }

}

/* list 通用样式 end*/

/* 编辑页面 */
.edit-table {
    padding-top: 15px;
    .el-input-number,
    .el-select {
        width: 100%;
    }
    .el-date-editor--datetime {
        width: 100%;
    }
    .el-checkbox-group,
    .el-switch {
        width: 100%;
        text-align: left;
    }
}

/* 详情页面 */
.detail-table {
    .el-form-item span {
        width: 100%;
        display: block;
        text-align: left;
        min-height: 30px;
        border-bottom: 1px solid #ccc!important;
    }
    .el-form-item {
        margin-bottom: 5px;
    }
}

.page-button {
    margin-top: 20px;
    text-align: center;
}
</style>
