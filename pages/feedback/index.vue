<template>
<div class="page-list">
  <div class="list-header">
    <div class="list-tools-button">
      <div class="tools-left">

      </div>
      <div :span="12" class="tools-right">
        <el-button-group>
          <el-button :plain="true" icon="search" @click="onSearch">搜索</el-button>
        </el-button-group>
      </div>
    </div>
    <el-form :inline="true" :model="formSearch" class="list-search-form" label-width="100px">
      <el-form-item label="反馈类型">
        <el-select v-model="formSearch.type" placeholder="类型" clearable>
          <el-option label="网站建议" value="0"></el-option>
          <el-option label="服务优化" value="1"></el-option>
          <el-option label="表扬一下" value="2"></el-option>
          <el-option label="其他" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="formSearch.createAt" style="width: 100%" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formSearch.status" placeholder="状态" clearable>
          <el-option label="已解决" value="0"></el-option>
          <el-option label="未解决" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="gridData" border style="width: 100%" height="100%" class="list-table-grid" @sort-change="sortChange">
    <el-table-column type="index" width="40"> </el-table-column>
    <el-table-column prop="email" label="邮箱" width="120" sortable> </el-table-column>
    <el-table-column prop="username" label="创建者" width="180" sortable> </el-table-column>
    <el-table-column prop="mobile" label="手机号码" width="120" sortable> </el-table-column>
    <el-table-column prop="pic" label="图片url" width="120">
      <template scope="scope">
        <img style="width: 100%" :src="scope.row.pic">
      </template>
    </el-table-column>
    <el-table-column prop="meta.updateAt" label="创建日期" width="180" :formatter="formatDate" sortable> </el-table-column>
    <el-table-column prop="type" label="类型" width="100"> </el-table-column>
    <el-table-column prop="status" label="状态" width="100"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template scope="scope">
          <el-button type="text" size="small" @click.native.prevent="goDetail(scope.$index, gridData)">查看</el-button>
          <el-button v-if="scope.row.status === '未解决'" type="text" size="small" @click.native.prevent="editRow(scope.$index, gridData)">标记完成</el-button>
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
  name: 'feedback-index',
  asyncData(ctx) {
    axios.ctx = ctx;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/feedback',
        title: '意见反馈'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    return {
      total: true,
      currentPage: 1,
      pageSize: 10,
      dataTotal: 0,
      pageSizes: [10, 20, 30, 400],
      formSearch: {
        type: '',
        pic: '',
        status: '',
        createAt: ''
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
      let url = '/feedback/list';
      let params = that.formSearch;
      params.rows = that.pageSize;
      params.page = that.currentPage;
      axios.post(url, params).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let body = result.data;
        body.docs.forEach(function(elem, index, arr) {
          if (elem.status === 0) {
            elem.status = '已解决';
          } else {
            elem.status = '未解决';
          }

          switch (Number(elem.type)) {
            case 0:
              elem.type = '网站建议';
              break;
            case 1:
              elem.type = '服务优化';
              break;
            case 2:
              elem.type = '表扬一下';
              break;
            case 3:
              elem.type = '其他';
              break;
            default:
              elem.type = '无类型';
          }
        });
        that.total = body.docs.length < 5;
        console.log(that.total);
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
    editRow(index, rows) {
      let that = this;
      console.log(index, rows);
      that
        .$confirm('此操作将任务标记完成, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let row = rows[index];
          that.onEditDo(row._id);
        })
        .catch(() => {});
    },
    onEditDo(id) {
      let that = this;
      let url = `/feedback/status/${id}`;
      axios.put(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        that.$message.success('成功（已解决）!');
        that.loadData();
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
      let url = `/feedback/${id}`;
      axios.delete(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        that.$message.success('删除成功!');
        that.loadData();
      });
    },
    goDetail(index, rows) {
      let row = rows[index];
      this.$router.push({
        path: `/feedback/detail?id=${row._id}`
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
  },
  head: {
    title: '意见反馈'
  }
};
</script>

<style scoped>
</style>
