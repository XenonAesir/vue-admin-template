<template>
  <div class="dashboard-container">
    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">{{name}}</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">管理员</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
