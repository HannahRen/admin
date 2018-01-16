<template>
<div class="upload">
  <el-dialog title="上传文件" v-model="isVisible" class="upload-dialog">
    <el-upload
      class="upload-demo"
      drag
      :show-file-list="showFileList"
      :action="'https://webcdnori.hulai.com/h/fileUpload/upload'"
      :on-success="uploadSuccess"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="upload_info"> <label for=""><span>URL:</span><a :href="urlPath" target="_blank">{{urlPath}}</a></label> <img :src="urlPath" alt="" v-if="isMp3==false"> </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'upload',
  props: ['visible', 'url'],
  data() {
    return {
      showFileList: false,
      isMp3: false,
      isVisible: false,
      urlPath: ''
    };
  },
  watch: {
    visible: function(val) {
      this.isVisible = val;
      this.urlPath = this.url;
    },
    isVisible: function(val) {
      this.$emit('isVisibleChange', val, this.urlPath);
    },
    url: function(val, oldVal) {
      if (!val) {
        return;
      }
      if (val.indexOf('mp3') >= 0) {
        this.isMp3 = true;
      } else {
        this.isMp3 = false;
      }
    }
  },
  methods: {
    loadData() {},
    uploadSuccess(data, file, fileList) {
      var that = this;
      that.uploadData = {};
      if (data.ret !== 1) {
        that.$message.error(data.msg);
      } else {
        that.urlPath = data.data.img;
        this.$emit('uploadSuccess', data);
      }
    }
  }
};
</script>

<style scoped>

</style>
