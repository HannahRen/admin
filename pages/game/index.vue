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
      <el-form-item label="游戏名称">
        <el-input v-model="formSearch.name" placeholder="游戏名称"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="formSearch.creator" placeholder="创建人"></el-input>
      </el-form-item>
      <el-form-item label="创建日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="formSearch.createAt" style="width: 100%" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formSearch.status" placeholder="状态" clearable>
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="gridData" border style="width: 100%" height="100%" class="list-table-grid" @sort-change="sortChange">
    <el-table-column type="index" width="40"> </el-table-column>
    <el-table-column prop="name" label="游戏名称" width="150" sortable> </el-table-column>
    <el-table-column prop="recommend" label="推荐" width="120" sortable> </el-table-column>
    <el-table-column prop="sorting" label="排序" width="120" sortable> </el-table-column>
    <el-table-column prop="ranking" label="排名" width="120" sortable> </el-table-column>
    <el-table-column prop="meta.createAt" label="创建时间" width="180" :formatter="formatDate" sortable> </el-table-column>
    <el-table-column prop="creator" label="创建人" width="120"> </el-table-column>
    <el-table-column prop="status" label="状态" width="120" sortable> </el-table-column>
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
import axios from '~/plugins/axios'
import momentUtil from '~/utils/moment-util'
export default {
  name: 'administrator-index',
  asyncData(ctx) {
    axios.ctx = ctx
    const breadcrumbJson = [{
        path: '/',
        title: '首页'
      },
      {
        path: '/game',
        title: '游戏列表'
      }
    ]
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson)
    return {
      currentPage: 1,
      pageSize: 10,
      dataTotal: 0,
      pageSizes: [10, 20, 30, 400],
      formSearch: {
        name: '',
        creator: '',
        status: '',
        createAt: ''
      },
      gridData: [],
      arrNum: ''
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      let that = this
      let url = '/game/list'
      let params = that.formSearch
      params.rows = that.pageSize
      params.page = that.currentPage
      axios.post(url, params).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message)
          return
        }
        let body = result.data
        body.docs.forEach(function(elem, index, arr) {
          if (elem.status === 1) {
            elem.status = '启用'
          } else {
            elem.status = '停用'
          }
        })
        that.gridData = body.docs
        that.arrNum = that.gridData.length
        console.log(that.gridData)
        that.dataTotal = body.total
      })
    },
    formatDate(row, column) {
      let property = column.property
      let val = ''
      property.split('.').forEach(function(item) {
        if (val === '') {
          val = row[item]
        } else {
          val = val[item]
        }
      })
      return momentUtil.formatDate(val)
    },
    onAdd() {
      this.onEdit('add', this.arrNum)
    },
    onEdit(id, num) {
      if (num) {
        this.$router.push({
          path: `/game/edit?id=${id}&num=${num}`
        })
      } else {
        this.$router.push({
          path: `/game/edit?id=${id}`
        })
      }
    },
    sortChange(ob) {
      if (ob.column) {
        this.formSearch.sort = ob.prop
        this.formSearch.order = ob.order === 'ascending' ? 'asc' : 'desc'
        this.loadData()
      }
    },
    onSearch() {
      this.loadData()
    },
    onDel() {},
    deleteRow(index, rows) {
      let that = this
      that
        .$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let row = rows[index]
          that.onDelDo(row._id)
        })
        .catch(() => {})
    },
    onDelDo(id) {
      let that = this
      let url = `/game/${id}`
      axios.delete(url).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message)
          return
        }
        that.$message.success('删除成功!')
        that.loadData()
      })
    },
    goEdit(index, rows) {
      let row = rows[index]
      this.onEdit(row._id)
    },
    goDetail(index, rows) {
      let row = rows[index]
      this.$router.push({
        path: `/game/detail?id=${row._id}`
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadData()
    }
  },
  head: {
    title: '账号管理'
  }
}
</script>

<style scoped>
</style>
