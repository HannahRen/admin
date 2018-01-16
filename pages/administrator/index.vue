<template>
<div class="page-list">
  <div class="list-header">
    <div class="list-tools-button">
      <div class="tools-left">
        <el-button-group>
          <el-button :plain="true" icon="plus" @click="onAdd">新增</el-button>
        </el-button-group>
      </div>
      <div class="tools-right">
        <el-button-group>
          <el-button :plain="true" icon="search" @click="onSearch">搜索</el-button>
        </el-button-group>
      </div>
    </div>
    <el-form :inline="true" :model="formSearch" class="list-search-form" label-width="100px">
      <el-form-item label="用户名">
        <el-input v-model="formSearch.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formSearch.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formSearch.mobile" placeholder="手机号"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="gridData" border style="width: 100%" height="100%" class="list-table-grid" @sort-change="sortChange">
    <el-table-column type="index" width="40"> </el-table-column>
    <el-table-column prop="username" label="用户名" width="120" sortable> </el-table-column>
    <el-table-column prop="email" label="邮箱" width="120" sortable> </el-table-column>
    <el-table-column prop="mobile" label="手机号" width="120"> </el-table-column>
    <el-table-column prop="department" label="部门" width="120"> </el-table-column>
    <el-table-column prop="position" label="职位" width="120"> </el-table-column>
    <el-table-column prop="meta.createAt" label="创建日期" width="180" :formatter="formatDate" sortable> </el-table-column>
    <el-table-column prop="lastIP" label="最后登录IP" width="200"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="180"><template scope="scope">
        <el-button type="text" size="small" @click.native.prevent="goDetail(scope.$index, gridData)">查看</el-button>
        <el-button type="text" size="small" @click.native.prevent="goEdit(scope.$index, gridData)">编辑</el-button>
        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, gridData)">删除</el-button>
</template>
    </el-table-column>
  </el-table>

  <div class="block list-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataTotal">
    </el-pagination>
  </div>

  </div>
</template>

<script>
import axios from '~/plugins/axios';
import momentUtil from '~/utils/moment-util';
export default {
  name: 'administrator-index',
  head() {
    return {
      title: '系统用户列表' + this.$store.app.head.title
    };
  },
  asyncData(ctx) {
    axios.ctx = ctx;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/administrator',
        title: '系统账号'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    return {
      currentPage: 1,
      pageSize: 10,
      dataTotal: 0,
      pageSizes: [10, 20, 30, 400],
      formSearch: {
        username: '',
        email: '',
        moblie: '',
        lastIP: '',
        sort: '',
        order: ''
      },
      gridData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let that = this;
      let url = '/administrator/list';
      let params = that.formSearch;
      params.rows = that.pageSize;
      params.page = that.currentPage;
      axios.post(url, params).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let body = result.data;
        that.gridData = body.docs;
        that.dataTotal = body.total;
      });
    },
    formatDate(row, column) {
      let property = column.property;
      let val = '';
      property.split('.').forEach(function(item) {
        if (val === '') {
          val = row[item];
        } else {
          val = val[item];
        }
      });
      return momentUtil.formatDate(val);
    },
    onAdd() {
      this.onEdit('add');
    },
    onEdit(id) {
      this.$router.push({
        path: `/administrator/edit?id=${id}`
      });
    },
    sortChange(ob) {
      if (ob.column) {
        this.formSearch.sort = ob.prop;
        this.formSearch.order = ob.order === 'ascending' ? 'asc' : 'desc';
        this.loadData();
      }
    },
    onSearch() {
      this.loadData();
    },
    onDel() {},
    deleteRow(index, rows) {
      let that = this;
      that
        .$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let row = rows[index];
          that.onDelDo(row._id);
        })
        .catch(() => {});
    },
    onDelDo(id) {
      let that = this;
      let url = `/administrator/${id}`;
      axios.delete(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        that.$message.success('删除成功!');
        that.loadData();
      });
    },
    goEdit(index, rows) {
      let row = rows[index];
      this.onEdit(row._id);
    },
    goDetail(index, rows) {
      let row = rows[index];
      this.$router.push({
        path: `/administrator/detail?id=${row._id}`
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
    }
  }
};
</script>

<style scoped>
</style>
