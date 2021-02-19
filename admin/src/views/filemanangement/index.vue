<template>
  <div class="file-container">
    <el-card>
      <el-row>
        <el-form :inline="true" :model="searchData" class="demo-form-inline">
          <el-col :span="20">
            <el-form-item label="日期：">
              <el-date-picker
                v-model="searchData.Date"
                size="small"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="searchData.PageIndex = 1"
              />
            </el-form-item>
            <el-form-item label="标题：">
              <el-input v-model="searchData.Title" size="small" placeholder="请输入标题" @input="searchData.PageIndex = 1" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="fetchData">查 询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" align="right">
            <el-form-item>
              <el-button type="primary" size="small" @click="add">新增文件</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="Date"
              label="日期"
            />
            <el-table-column
              prop="Title"
              label="文件标题"
            />
            <el-table-column prop="Remark" label="备注" />
            <el-table-column
              prop="CreatedName"
              label="创建人"
            />
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button type="text" @click="remove(scope.row)">删除</el-button>
                <el-button type="text" @click="doDownLoad(scope.row)">下载</el-button>
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
      <l-form ref="lForm" :dialog-visible.sync="dialogVisible" :title="title" :form="formData" @submit="submit" />
    </el-card>
  </div>
</template>

<script>
import moment from 'dayjs'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('file')
import lForm from './components/form'
export default {
  name: 'Dashboard',
  components: {
    lForm
  },
  data() {
    return {
      searchData: {
        Date: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        StartDate: moment().format('YYYY-MM-DD'),
        EndDate: moment().format('YYYY-MM-DD'),
        Title: '',
        PageIndex: 1,
        PageSize: 10
      },
      dialogVisible: false,
      tableData: [],
      title: '新增文件',
      formData: {
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Title: '',
        Type: '',
        CoverPictureUrl: '',
        ContentUrl: '',
        Remark: ''
      },
      total: 0
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      getData: 'getData',
      postData: 'postData',
      getDataById: 'getDataById',
      removeData: 'removeData'
    }),
    async fetchData() {
      if (this.searchData.Date && this.searchData.Date.length > 0) {
        this.searchData.StartDate = this.searchData.Date[0]
        this.searchData.EndDate = moment(this.searchData.Date[1]).add(1, 'day').format('YYYY-MM-DD')
      }
      const result = await this.getData(this.searchData)
      if (result.success) {
        this.tableData = result.data
        this.total = result.count
      } else {
        this.$message.error(result.message)
      }
    },
    handleCurrentChange(val) {
      this.searchData.PageIndex = val
      this.fetchData()
    },
    add() {
      this.dialogVisible = true
      this.title = '新增文件'
      this.$nextTick(() => {
        this.$refs.lForm.$refs.ruleForm.resetFields()
      })
    },
    async submit(val) {
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
      this.title = '编辑文件'
      const data = {
        Id: row.Id
      }
      const result = await this.getDataById(data)
      if (result.success) {
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs.lForm.$refs.ruleForm.resetFields()
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
    doDownLoad(row) {
      if (row.ContentUrl.includes('txt')) {
        var pom = document.createElement('a')
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(row.Content))
        pom.setAttribute('download', row.ContentUrl.split('/').pop())
        if (document.createEvent) {
          var event = document.createEvent('MouseEvents')
          event.initEvent('click', true, true)
          pom.dispatchEvent(event)
        } else {
          pom.click()
        }
      } else {
        window.location.href = row.ContentUrl
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
