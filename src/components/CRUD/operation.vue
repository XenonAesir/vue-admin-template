<template>
    <!-- :data="list.filter(data => !search || data.name.includes(search))" -->
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="查询" size="mini">
          <el-input v-model="formInline.user" placeholder="请输入姓名搜索" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { getList } from '@/api/table'
  
  export default {
    data() {
      return {
        formInline: {
          name: '',
          region: ''
        }
      }
    },
    methods: {
      handleSearch(){
        console.log(search)
      },
      onSubmit() {
          console.log('submit!');
      }
    }
    
  }
  </script>
  