<template>
  <div class="app-container">
    <el-header style="line-height:60px;">
      <!-- 操作按钮 -->
      <Operation @operation-complete="updateTableList" :rules="rules"></Operation>
    </el-header>

    <el-main>
      <!-- 表单数据 -->
      <Table :list="tableList" :rules="rules"></Table>
    </el-main>
  </div>
</template>

<script>
import Table from '@/components/CRUD/table.vue'
import Operation from '@/components/CRUD/operation.vue'
import Dialog from '@/components/CRUD/dialog.vue'

export default {
  components: {
    Table,
    Operation,
    Dialog
  },
  data() {
    return {
      tableList: null,
      rules: {
        name: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择教师性别', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请输入教师年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        major: [
          { required: true, message: '请选择所授科目', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    updateTableList(list) {
      this.tableList = list;
    }
  }
}
</script>
