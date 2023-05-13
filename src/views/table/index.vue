<template>
  <!-- :data="list.filter(data => !search || data.name.includes(search))" -->
  <div class="app-container">
    <el-table v-loading="listLoading"
      :data="list.filter(data => !search || data.name.includes(search))"
      element-loading-text="Loading" border fit highlight-current-row
      :default-sort="{ prop: 'name', order: 'ascending' }">
      <el-table-column prop="ID" align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" 
      sortable
      :sort-method="(a,b) => a.name.localeCompare(b.name)" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="110" align="center"
        :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
        :filter-method="filterSex"
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
      <el-table-column prop="major" class-name="status-col" label="专业" width="110" align="center"
        :filters="[{ text: '主科', value: '主科' },
        { text: '理科', value: '理科' },
        { text: '文科', value: '文科' },
        { text: '副科', value: '副科' },
        ]"
        :filter-method="filterMajor"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.major | statusFilter">{{ scope.row.major }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="right" width="400">
        <template slot="header" slot-scope="scope">
          <!-- <el-input v-model="search" label="操作列表" size="mini" placeholder="输入关键字搜索" :search-method="handleSearch" />
          <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button> -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="height: 34px;">
              <el-form-item label="查询" size="mini" style="vertical-align: middle;">
                <el-input v-model="formInline.user" placeholder="请输入姓名搜索" size="mini"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" size="mini" style="vertical-align: middle;">查询</el-button>
              </el-form-item>
          </el-form>

        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="current"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
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
      list: null,
      listLoading: true,
      search: null,

      total: null,
      size : null,
      current : null,

      formInline: {
          user: '',
          region: ''
        }
      // pages : null,
    }
  },
  created() {
    this.fetchData({
        page : 1
      })
  },
  methods: {
    fetchData(params) {
      this.listLoading = true
      getList(params).then(response => {
        this.list = response.data.data.records
        this.total = response.data.data.total
        this.size = response.data.data.size
        this.current = response.data.data.current
        this.listLoading = false
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSearch(){
      console.log(search)
    },
    filterSex(value, row) {
      return row.sex === value
    },
    filterMajor(value, row) {
      switch(value){
        case '主科':
          return row.major === '数学' ||  row.major === '语文' ||  row.major === '英语'
        case '理科':
          return row.major === '物理' ||  row.major === '化学' ||  row.major === '生物'
        case '文科':
          return row.major === '历史' ||  row.major === '政治' ||  row.major === '地理'
        case '副科':
          return row.major === '微机' ||  row.major === '体育'
      }
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.fetchData({
        page : val
      })
    },
    onSubmit() {
        console.log('submit!');
    }
  }
  
}
</script>
