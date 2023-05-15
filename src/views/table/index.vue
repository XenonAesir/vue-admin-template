<template>
  <div class="app-container">
    <el-header style="line-height:60px;">
      <!-- 操作按钮 -->
      <Operation @operation-complete="updateTableList"></Operation>
    </el-header>

    <el-main>
      <!-- 表单数据 -->
      <Table :list="tableList"></Table>
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
      tableList: null
    }
  },
  methods: {
    updateTableList(list) {
      this.tableList = list;
    }
  }
}
</script>
