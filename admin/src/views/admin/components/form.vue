<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="cancel"
      width="30%"
    >
      <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="姓名" prop="Name">
              <el-input v-model="form.Name" size="small" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="性别" prop="Sex">
              <el-select v-model="form.Sex" size="small" style="width: 100%" placeholder="请选择性别">
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="登录名" prop="LoginName">
              <el-input v-model="form.LoginName" size="small" placeholder="请输入登录名" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码" prop="PassWord">
              <el-input v-model="form.PassWord" show-password size="small" placeholder="请输入密码" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色" prop="RoleId">
              <el-select v-model="form.RoleId" size="small" style="width: 100%" placeholder="请选择角色">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                />
              </el-select>
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
export default {
  props: {
    title: {
      type: String,
      default: '新增角色'
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
    },
    roleOptions: {
      type: Array,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      genderOptions: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 0
        }
      ],
      rules: {
        Name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        Sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        LoginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        PassWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        RoleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('update:dialogVisible', false)
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit('submit', Object.assign({}, this.form))
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
