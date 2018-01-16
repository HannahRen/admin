<template>
<div class="upload-input">
  <el-input v-model="inputModelVal" :placeholder="placeholder" icon="search" :on-icon-click="handleIconClick">
    <template slot="prepend">尺寸：{{dimension}}</template>
  </el-input>
  <upload :visible="uploadVisible" :url="inputModelVal" v-on:isVisibleChange="isVisibleChange" v-on:uploadSuccess="uploadSuccess"></upload>
</div>
</template>

<script>
import upload from '~/components/framework/Upload';
import _trim from 'lodash/trim';
export default {
  name: 'upload-input',
  props: ['inputModel', 'placeholder', 'dimension'],
  data() {
    return {
      inputModelVal: '',
      uploadVisible: false,
      urlPath: ''
    };
  },
  components: {
    upload
  },
  watch: {
    inputModel: function(val) {
      if (val === this.inputModelVal) return;
      this.inputModelVal = _trim(val);
    },
    inputModelVal: function(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    handleIconClick() {
      this.uploadVisible = true;
      this.inputModelVal = this.inputModelVal;
    },
    isVisibleChange(val) {
      this.uploadVisible = val;
    },
    uploadSuccess(result) {
      this.inputModelVal = result.data.img;
    }
  }
};
</script>

<style scoped>

</style>
