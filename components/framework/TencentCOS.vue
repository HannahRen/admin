<template>
<div class="cos">
  <el-dialog title="腾讯云 COS 文件上传" v-model="dialogVisible" width="30%" class="upload-dialog">
  <el-upload
    class="upload-demo"
    drag
    :headers="headers"
    :action="cosUploadUrl"
    :on-success="onSuccess"
    :show-file-list="false"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
  <div class="upload_info">
    <a :href="urlPath" target="_blank"><img :src="urlPath" alt="" :title="imgTitle" width="50%" v-if="isImg==true"></a>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
  name: 'cos',
  props: ['visible', 'url'],
  data() {
    let that = this
    let baseUrl = process.env.gateway_base_url
    return {
      cosUploadUrl: `http://${baseUrl}/hoolai-web/admin/api/upload/cos`,
      headers: {
        Authorization: that.$store.state.token.tokeninfo
      },
      dialogVisible: false,
      urlPath: '',
      imgTitle: '',
      isImg: false
    }
  },
  watch: {
    visible: function(val) {
      this.dialogVisible = val
      this.urlPath = this.url
      this.imgTitle = (this.urlPath).slice((this.urlPath).lastIndexOf('/') + 1)
    },
    dialogVisible: function(val) {
      this.$emit('dialogVisibleChange', val)
    },
    url: function(val, oldVal) {
      if (!val) {
        return
      }
      if (val.indexOf('.image.') >= 0) {
        this.isImg = true
      } else {
        this.isImg = false
      }
    }
  },
  methods: {
    onSuccess(response, file, fileList) {
      this.urlPath = file.response.data.Url
      this.isImg = file.response.data.Type === 'image'
      this.imgTitle = (this.urlPath).slice((this.urlPath).lastIndexOf('/') + 1)
      this.$emit('uploadSuccess', file.response)
    }
  }
};
</script>

<style scoped>

</style>
