<template>
  <!-- :data="list.filter(data => !search || data.name.includes(search))" -->
  <div class="app-container">
    <!-- 操作按钮 -->
    <Operation></Operation>
    
    <!-- 表单数据 -->
    <Table></Table>
  </div>
</template>

<script>
import Table from '@/components/CRUD/table.vue'
import Operation from '@/components/CRUD/operation.vue'

export default {
  components: {
    Table,
    Operation
  }
}
</script>
