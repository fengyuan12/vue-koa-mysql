<template>
  <div class="admin-container">
    <el-card>
      <el-row>
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
          <el-col :span="20">
            <el-form-item label="用户：">
              <el-input v-model="searchData.Name" size="small" placeholder="请输入用户姓名" @input="searchData.PageIndex = 1" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="fetchData()">查 询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" align="right">
            <el-form-item>
              <el-button type="primary" size="small" @click="add">新增用户</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            v-loading="tableLoading"
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="Name"
              label="姓名"
            />
            <el-table-column
              prop="LoginName"
              label="登录名"
            />
            <el-table-column
              prop="Sex"
              label="性别"
            >
              <template slot-scope="scope">
                {{ gender(scope.row.Sex) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="RoleName"
              label="角色"
            />
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button type="text" @click="remove(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="total > 0"
            style="float: right;padding-top: 20px"
            :current-page.sync="searchData.PageIndex"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>
      <l-form ref="lForm" :dialog-visible.sync="dialogVisible" :role-options="roleOptions" :title="title" :form="formData" @submit="submit" />
    </el-card>
  </div>
</template>

<script>
import lForm from './components/form'
import { encrypt, decrypt } from '@/utils/crypto'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  name: 'Admin',
  components: {
    lForm
  },
  data() {
    return {
      searchData: {
        Name: '',
        PageIndex: 1,
        PageSize: 10
      },
      dialogVisible: false,
      tableData: [],
      title: '新增用户',
      formData: {
        Name: '',
        Sex: '',
        LoginName: '',
        PassWord: '',
        RoleId: ''
      },
      total: 0,
      tableLoading: false,
      roleOptions: []
    }
  },
  mounted() {
    this.fetchData()
    this.fetchRoleData()
  },
  methods: {
    ...mapActions({
      getUserData: 'getUserData',
      getDataById: 'getDataById',
      getRoleData: 'getRoleData',
      postData: 'postData',
      removeData: 'removeData'
    }),
    gender(val) {
      let result = ''
      switch (val) {
        case 1:
          result = '男'
          break
        case 0:
          result = '女'
          break
        default:
          break
      }
      return result
    },
    async fetchData() {
      this.tableLoading = true
      const result = await this.getUserData(this.searchData)
      if (result.success) {
        this.tableData = result.data
        this.total = result.count
        this.tableLoading = false
      } else {
        this.tableLoading = false
        this.$message.error(result.message)
      }
    },
    async fetchRoleData() {
      const result = await this.getRoleData()
      if (result.success) {
        this.roleOptions = result.data
      } else {
        this.$message.error(result.message)
      }
    },
    add() {
      this.dialogVisible = true
      this.title = '新增用户'
      this.$nextTick(() => {
        this.$refs.lForm.$refs.ruleForm.resetFields()
      })
    },
    async submit(val) {
      val.PassWord = encrypt(val.PassWord)
      const result = await this.postData(val)
      if (result.success) {
        this.dialogVisible = false
        this.fetchData()
        this.$message.success('保存成功！')
      } else {
        this.$message.error(result.message)
      }
    },
    async edit(row) {
      this.title = '编辑用户'
      const data = {
        Id: row.Id
      }
      const result = await this.getDataById(data)
      if (result.success) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.lForm.$refs.ruleForm.resetFields()
          result.data.PassWord = decrypt(result.data.PassWord)
          this.formData = result.data
        })
      } else {
        this.$message.error(result.message)
      }
    },
    remove(row) {
      const data = {
        Id: row.Id
      }
      this.$confirm('是否删除？', '警告', {
        type: 'warning'
      }).then(async() => {
        const result = await this.removeData(data)
        if (result.success) {
          this.fetchData()
          this.$message.success('删除成功！')
        } else {
          this.$message.error(result.message)
        }
      }).catch(err => console.log(err))
    },
    handleCurrentChange(val) {
      this.searchData.PageIndex = val
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.admin {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
