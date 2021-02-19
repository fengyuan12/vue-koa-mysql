<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="cancel"
      :close-on-click-modal="false"
      width="50%"
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
            <el-form-item label="文件标题" prop="Title">
              <el-input v-model="form.Title" size="small" placeholder="请输入文件标题" />
            </el-form-item>
          </el-col>
          <el-col v-if="!form.Id" :span="12">
            <el-form-item label="文件类型" prop="Type">
              <el-select v-model="form.Type" size="small" placeholder="请选择文件类型" style="width: 100%">
                <el-option v-for="item of fileTypes" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="!form.Id" :span="24">
            <el-form-item label="文件封面" prop="CoverPictureUrl">
              <el-upload
                class="avatar-uploader"
                action="/api/file/upload"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="form.CoverPictureUrl" :src="form.CoverPictureUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col v-if="!form.Id" :span="24">
            <el-form-item label="文件" prop="ContentUrl">
              <el-upload
                class="upload-demo"
                action="/api/file/upload"
                :headers="uploadHeaders"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="handleFileSuccess"
                :before-upload="beforeFileUpload"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="Remark">
              <el-input
                v-model="form.Remark"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
              />
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
import { getToken } from '@/utils/auth'
export default {
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
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        Type: [
          { required: true, message: '请选择文件类型', trigger: 'change' }
        ],
        CoverPictureUrl: [
          { required: true, message: '请选择文件封面', trigger: 'blur' }
        ],
        ContentUrl: [
          { required: true, message: '请选择文件', trigger: 'change' }
        ]
      },
      fileList: [],
      uploadHeaders: {
        Authorization: JSON.parse(getToken()).token
      },
      fileTypes: [
        { label: '文本', value: 'TXT' },
        { label: '视频', value: 'MP4' },
        { label: '其他', value: 'OTHER' }
      ]
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
    },
    handleAvatarSuccess(res, file) {
      this.form.CoverPictureUrl = `http://127.0.0.1:3000/${res.data.url}`
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.warning('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.warning('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    beforeFileUpload(file) {
      let result = true
      const isLt200M = file.size / 1024 / 1024 < 200
      if (this.form.Type) {
        switch (this.form.Type) {
          case 'TXT':
            result = file.type === 'text/plain'
            break
          case 'MP4':
            result = file.type === 'video/mp4'
            break
          default:
            break
        }
      }
      if (!result) {
        this.$message.warning('上传文件与文件类型不匹配')
      }
      if (!isLt200M) {
        this.$message.warning('上传图片大小不能超过 200MB!')
      }
      return result && isLt200M
    },
    handleExceed(files, fileList) {
      this.$message.warning('只能上传一个文件')
    },
    handleFileSuccess(res, file) {
      this.form.ContentUrl = `http://127.0.0.1:3000/${res.data.url}`
    }
  }
}
</script>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
