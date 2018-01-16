<template>
<div class="quillWrapper">
  <div ref="quillContainer" :id="id"></div>
  <input v-if="useCustomImageHandler" @change="emitImageInfo($event)" ref="fileInput" id="file-upload" type="file" style="display:none;">
</div>
</template>
<script>
const Quill = process.browser ? require('quill') : '';

let defaultToolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'image'],
  [
    {
      list: 'ordered'
    },
    {
      list: 'bullet'
    }
  ],
  [
    {
      indent: '-1'
    },
    {
      indent: '+1'
    }
  ],
  [
    {
      header: [1, 2, 3, 4, 5, 6, false]
    }
  ],
  [
    {
      color: []
    },
    {
      background: []
    }
  ],
  [
    {
      font: []
    }
  ],
  [
    {
      align: []
    }
  ],
  ['clean']
];

export default {
  name: 'vue-editor',
  props: {
    value: String,
    id: {
      type: String,
      default: 'quill-container'
    },
    placeholder: String,
    disabled: Boolean,
    editorToolbar: Array,
    useCustomImageHandler: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      quill: null,
      editor: null,
      toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar
    };
  },

  mounted() {
    this.initializeVue2Editor();
    this.handleUpdatedEditor();
  },

  watch: {
    value(val) {
      if (val !== this.editor.innerHTML && !this.quill.hasFocus()) {
        this.editor.innerHTML = val;
      }
    },
    disabled(status) {
      this.quill.enable(!status);
    }
  },

  methods: {
    initializeVue2Editor() {
      this.setQuillElement();
      this.setEditorElement();
      this.checkForInitialContent();
    },

    setQuillElement() {
      this.quill = new Quill(this.$refs.quillContainer, {
        modules: {
          toolbar: this.toolbar
        },
        placeholder: this.placeholder ? this.placeholder : '',
        theme: 'snow',
        readOnly: this.disabled ? this.disabled : false
      });
      // this.quill.addModule('toolbar', {
      //   container: '#toolbar' // Selector for toolbar container
      // });
      this.checkForCustomImageHandler();
      console.log(this.quill);
    },

    checkForCustomImageHandler() {
      if (this.useCustomImageHandler === true) {
        this.setupCustomImageHandler();
      }
      // this.useCustomImageHandler === true ? this.setupCustomImageHandler() : ''
    },

    setupCustomImageHandler() {
      let toolbar = this.quill.getModule('toolbar');
      toolbar.addHandler('image', this.customImageHandler);
    },

    customImageHandler(image, callback) {
      this.$refs.fileInput.click();
    },

    emitImageInfo($event) {
      let that = this;
      let file = $event.target.files[0];
      let Editor = this.quill;
      let range = Editor.getSelection();
      let cursorLocation = range.index;
      let data = new FormData();
      data.append('image', file);
      let url = 'https://webcdnori.hulai.com/h/fileUpload/upload';
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          let data = JSON.parse(xhr.responseText);
          if (data.ret !== 1) {
            that.$message.error(data.msg);
          }
          let urlPath = data.data.img;
          Editor.insertEmbed(cursorLocation, 'image', urlPath);
        }
      };
      xhr.send(data);
    },

    setEditorElement() {
      this.editor = document.querySelector(`#${this.id} .ql-editor`);
    },

    checkForInitialContent() {
      this.editor.innerHTML = this.value || '';
    },

    handleUpdatedEditor() {
      this.quill.on('text-change', () => {
        this.$emit('input', this.editor.innerHTML);
      });
    }
  }
};
</script>

<style>
#quill-container {
  height: 400px;
}
</style>
