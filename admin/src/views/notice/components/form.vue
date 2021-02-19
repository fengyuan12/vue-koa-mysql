<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="cancel"
      :close-on-click-modal="false"
      width="60%"
    >
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="日期" prop="Date">
              <el-date-picker
                v-model="form.Date"
                style="width: 100%"
                size="small"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告标题" prop="Title">
              <el-input v-model="form.Title" size="small" placeholder="请输入公告标题" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="公告内容" prop="Content">
              <editor :tinymce-value.sync="form.Content" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import editor from '@/components/editor'
export default {
  components: {
    editor
  },
  props: {
    title: {
      type: String,
      default: '新增公告'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      rules: {
        Date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        Title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        Content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('update:dialogVisible', false)
    },
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', Object.assign({}, this.form))
        }
      })
    }
  }
}
</script>

<style>

</style>
