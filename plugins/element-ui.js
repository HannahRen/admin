import Vue from 'vue'
import UploadInput from '~/components/framework/UploadInput'
import UploadCOS from '~/components/framework/UploadCOS'

Vue.use(require('element-ui'))

Vue.component('UploadInput', UploadInput);
Vue.component('upload-cos', UploadCOS);
