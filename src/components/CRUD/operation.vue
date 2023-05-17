<template>
  <div style="vertical-align: middle;">
    <el-button plain size="small" @click="openInsertTeacherDialog" type="primary">添加教师</el-button>
    <el-button plain size="small" @click="openQueryTeacherDialog">查询教师</el-button>
    <el-button plain size="small" @click="refrashTeacherList" type="info">重置结果</el-button>
    <Dialog ref="insertDialog" :title="insertDialogTitle" :submitHandler="insertTeacher" :needValidForm="true"
      :rules="rules"></Dialog>
    <Dialog ref="queryDialog" :title="queryDialogTitle" :submitHandler="queryTeacher"></Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/CRUD/dialog.vue'
import { getList, insertTeacher, queryTeacher } from '@/api/table'

export default {
  components: {
    Dialog
  },
  props :{
    rules: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      insertDialogTitle: '添加教师',
      queryDialogTitle: '查询教师',
    }
  },
  methods: {
    openInsertTeacherDialog() {
      this.$refs.insertDialog.doOpen();
    },
    openQueryTeacherDialog() {
      this.$refs.queryDialog.doOpen();
    },
    closeInsertTeacherDialog() {
      this.$refs.insertDialog.doClose();
    },
    closeQueryTeacherDialog() {
      this.$refs.queryDialog.doClose();
    },
    insertTeacher(formData) {
      insertTeacher(formData).then(response => {
        // 处理添加教师成功的逻辑
        getList().then(response => {
          this.$emit('operation-complete', response.data.data)
          this.$message({
            message: '成功添加了' + formData.major + '教师' + formData.name + '的信息',
            type: 'success'
          })
          this.closeInsertTeacherDialog()
        })
      })
    },
    queryTeacher(formData) {
      queryTeacher(formData).then(response => {
        // 处理查询教师成功的逻辑
        this.$emit('operation-complete', response.data.data)
        this.$message({
          message: '查询完成，共' + response.data.data.length + '条数据符合',
          type: 'success'
        })
        this.closeQueryTeacherDialog()
      })
    },
    refrashTeacherList() {
      getList().then(response => {
        this.$emit('operation-complete', response.data.data);
        this.$message({
          message: '重置完成',
          type: 'info'
        })
      })
    }

  }
}
</script>
