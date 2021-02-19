<template>
  <div>
    <Editor
      v-model="newValue"
      :style="{'padding': isInline ? '16px' : ''}"
      api-key="no-key"
      :init="editorInit"
      @input="inputChange"
      @onChange="dicChange"
      @onBlur="blur"
    />
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/autoresize'
export default {
  components: {
    Editor
  },
  props: {
    tinymceValue: {
      type: String,
      default: ''
    },
    isInline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editorInit: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 400,
        menubar: false,
        // plugins: 'link lists table colorpicker textcolor contextmenu autoresize',
        plugins: 'link lists table autoresize',
        statusbar: false,
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat | table',
        branding: false,
        auto_focus: true
      },
      editor: null
    }
  },
  computed: {
    newValue: {
      get() {
        return this.tinymceValue
      },
      set() {

      }
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    dicChange(val) {
    },
    inputChange(val) {
      this.$emit('update:tinymceValue', val)
    },
    insertContent(val) {
      tinymce.execCommand('mceInsertContent', false, val)
    },
    blur() {
      this.$emit('blur')
    },
    setContent() {
      tinymce.activeEditor.setContent('')
    }
  }
}
</script>
