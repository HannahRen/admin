<template>
  <div class="upload-cos">
    <el-input v-model="inputModelVal" :placeholder="placeholder" icon="upload2" :on-icon-click="handleIconClick">
      <template slot="prepend">尺寸：{{dimension}}</template>
    </el-input>
    <cos :visible="uploadVisible" :url="inputModelVal" v-on:dialogVisibleChange="dialogVisibleChange" v-on:uploadSuccess="uploadSuccess"></cos>
  </div>
</template>

<script>
import cos from '~/components/framework/TencentCOS';
import _trim from 'lodash/trim';
export default {
  name: 'upload-cos',
  props: ['inputModel', 'placeholder', 'dimension'],
  data() {
    return {
      inputModelVal: '',
      uploadVisible: false
    };
  },
  components: {
    cos
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
    dialogVisibleChange(val) {
      this.uploadVisible = val;
    },
    uploadSuccess(result) {
      this.inputModelVal = result.data.Url;
    }
  }
};
</script>

<style scoped>
</style>
