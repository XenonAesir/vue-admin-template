<template>
  <div class="table-box" ref="tableBox">
    <!-- <el-button @click="clearFilter">清除所有过滤器</el-button> -->
    <el-table v-loading="listLoading" :data="localList.filter(data => !search || data.name.includes(search))"
      element-loading-text="Loading" border fit highlight-current-row :default-sort="{ prop: 'name', order: 'ascending' }"
      v-if="tableHeight" :max-height="tableHeight + 'px'"
      ref="filterTable">
      <el-table-column prop="ID" align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable :sort-method="(a, b) => a.name.localeCompare(b.name)">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="110" align="center"
        :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]" :filter-method="filterSex"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="110" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column prop="major" class-name="status-col" label="专业" width="110" align="center" :filters="[{ text: '主科', value: '主科' },
      { text: '理科', value: '理科' },
      { text: '文科', value: '文科' },
      { text: '副科', value: '副科' },
      ]" :filter-method="filterMajor" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.major | statusFilter">{{ scope.row.major }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right" width="400">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" label="操作列表" size="mini" placeholder="输入姓名当页搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button plain size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>

          <el-popover placement="top" width="160" :ref="`popover1-${scope.$index}`">
            <p>确定删除此条信息吗</p>
            <div style="text-align: right; margin: 0">
              <el-button plain size="mini"
                @click="scope._self.$refs[`popover1-${scope.$index}`].doClose()">取消</el-button>
              <el-button plain type="primary" size="mini"
                @click="scope._self.$refs[`popover1-${scope.$index}`].doClose(), handleDelete(scope.$index, scope.row)">确定</el-button>
            </div>
            <el-button plain size="mini" type="danger" slot="reference" style="margin-left:10px;">删除</el-button>
          </el-popover>


        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
<script>
import { getList, deleteTeacher, updateTeacher } from '@/api/table'

export default {
  name: 'Table',
  props: ['list'],
  filters: {
    statusFilter(status) {
      const statusMap = {
        数学: 'default',
        语文: 'default',
        英语: 'default',
        物理: 'warning',
        化学: 'warning',
        生物: 'warning',
        历史: 'success',
        政治: 'success',
        地理: 'success',
        微机: 'info',
        体育: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: true,
      search: null,
      tableHeight: 0,
      localList: [] // 新增本地的 data 属性
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    //减去翻页的高度，因为容器包含了表格和翻页
    this.tableHeight = this.$refs.tableBox.clientHeight;
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.localList = response.data.data
        this.listLoading = false
      })
    },
    handleUpdate(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      deleteTeacher(row).then(response => {
        this.$message({
          message: '成功删除了' + row.major + '教师' + row.name + '的信息',
          type: 'success'
        })
        this.fetchData()
      })

    },
    filterSex(value, row) {
      return row.sex === value
    },
    filterMajor(value, row) {
      switch (value) {
        case '主科':
          return row.major === '数学' || row.major === '语文' || row.major === '英语'
        case '理科':
          return row.major === '物理' || row.major === '化学' || row.major === '生物'
        case '文科':
          return row.major === '历史' || row.major === '政治' || row.major === '地理'
        case '副科':
          return row.major === '微机' || row.major === '体育'
      }
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    handleCurrentChange(val) {
      this.fetchData({
        page: val
      })
    },
  },
  watch: {
    list(newValue) {
      // 数据更新时调用updateData方法更新表格数据
      // this.updateList(newValue);
      this.localList = newValue
    }
  }

}
</script>
  
<style>
.table-box {
  height: calc(100vh - 190px);
  /*示例中顶部区域固定高度190px*/
}
</style>