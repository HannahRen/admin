<template>
<div class="page-edit">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="edit-table">
    <el-row>
      <el-col :span="8">
        <el-form-item label="游戏名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="游戏名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="官网地址" prop="officalWebsite">
          <el-input v-model="ruleForm.officalWebsite" placeholder="官网"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下载地址" prop="downloadAddress">
          <el-input v-model="ruleForm.downloadAddress" placeholder="下载地址"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="推荐" prop="recommend">
          <el-input v-model="ruleForm.recommend" placeholder="推荐"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="排序" prop="sorting">
          <el-input v-model="ruleForm.sorting" placeholder="排序"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="排名" prop="ranking">
          <el-input v-model="ruleForm.ranking" placeholder="排名"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="展现图" prop="thumbnail">
          <upload-cos :inputModel="ruleForm.thumbnail" v-model="ruleForm.thumbnail" placeholder="展现图" dimension="285*180"></upload-cos>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="缩略图" prop="gameIcon">
          <upload-cos :inputModel="ruleForm.gameIcon" v-model="ruleForm.gameIcon" placeholder="缩略图" dimension="80*80"></upload-cos>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="hover图" prop="headerPic">
          <upload-cos :inputModel="ruleForm.headerPic" v-model="ruleForm.headerPic" placeholder="hover图" dimension="160*200"></upload-cos>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" placeholder="描述"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="ruleForm.note" placeholder="备注"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="padding-left: 60px;font-size: 14px;">
        注：<br>1、推荐值代表首页热门游戏的排列顺序，升序，0表示不展示<br>
        2、排序值代表游戏列表页的排列顺序，升序，0表示不展示<br>
        3、排名值代表各页右侧游戏排行的排列顺序，升序，0表示不展示
      </el-col>
    </el-row>
  </el-form>
  <div class="page-button">
    <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
    <el-button @click="goBack()">返 回</el-button>
  </div>
</div>
</template>
<script>
import axios from '~/plugins/axios';
import _forEach from 'lodash/forEach';
export default {
  name: 'administrator-edit',
  asyncData(ctx) {
    axios.ctx = ctx;
    const id = ctx.query.id;
    const breadcrumbJson = [
      {
        path: '/',
        title: '首页'
      },
      {
        path: '/game',
        title: '游戏管理'
      },
      {
        path: '/game/edit?id=' + id,
        title: '游戏编辑'
      }
    ];
    ctx.store.commit('breadcrumb/breadcrumb', breadcrumbJson);
    const initForm = {
      _id: id,
      name: '',
      desc: '',
      thumbnail: '',
      gameIcon: '',
      hoverPic: '',
      officalWebsite: '',
      downloadAddress: '',
      creator: '',
      status: '1',
      sorting: '',
      recommend: 0,
      ranking: 0,
      note: '',
      meta: {
        createAt: '',
        updateAt: ''
      }
    };
    let ruleForm = initForm;
    return {
      _id: id,
      initForm: initForm,
      ruleForm: ruleForm,
      rules: {
        name: [
          {
            required: true,
            message: '请输入游戏名称',
            trigger: 'blur'
          }
        ],
        downloadAddress: [
          {
            required: true,
            message: '请输入游戏下载地址',
            trigger: 'blur'
          }
        ],
        officalWebsite: [
          {
            required: true,
            message: '请输入官网地址',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入游戏描述',
            trigger: 'blur'
          }
        ],
        thumbnail: [
          {
            required: true,
            message: '请输入游戏展示图',
            trigger: 'blur'
          }
        ],
        gameIcon: [
          {
            required: true,
            message: '请输入游戏缩略图',
            trigger: 'blur'
          }
        ],
        hoverPic: [
          {
            required: true,
            message: '请输入游戏hover图',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let that = this;
      let id = this.ruleForm._id;
      that.ruleForm.creator = that.$store.state.user.userinfo.username;
      if (id !== 'add') {
        let url = '/game/' + id;
        axios.get(url).then(function(result) {
          if (result.code !== 0) {
            that.$message.error(result.message);
            return;
          }
          let body = result.data;
          body.status = body.status + '';
          body.recommend = body.recommend + '';
          body.ranking = body.ranking + '';
          that.ruleForm = body;
        });
      } else {
        // 取当前游戏的个数
        let locationHrefArr = window.location.href.split('=');
        if (locationHrefArr.length === 2) {
          that.ruleForm.sorting = 1;
        } else {
          let num = locationHrefArr[locationHrefArr.length - 1];
          that.ruleForm.sorting = parseInt(num) + 1;
        }
      }
    },
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        that.submitFormDo();
      });
    },
    submitFormDo() {
      let that = this;
      let params = {};
      _forEach(that.ruleForm, function(val, key) {
        params[key] = val;
      });
      let url = '';
      url = '/game/save';
      axios.post(url, params).then(function(result) {
        if (result.code !== 0) {
          that.$message.error(result.message);
          return;
        }
        let body = result.data;
        body.status = body.status + '';
        body.recommend = body.recommend + '';
        body.ranking = body.ranking + '';
        that.ruleForm = body;
        that.$message.success('保存成功!');
        that.goDetail();
      });
    },
    goDetail() {
      let that = this;
      that.$router.push({
        path: '/game/detail',
        query: {
          id: that.ruleForm._id
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 30px;
}
</style>
