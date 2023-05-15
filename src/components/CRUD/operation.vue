<template>
  <div style="vertical-align: middle;">
    <el-button plain size="small" @click="openInsertTeacherDialog" type="primary">添加教师</el-button>
    <el-button plain size="small" @click="openQueryTeacherDialog">查询教师</el-button>
    <el-button plain size="small" @click="refrashTeacherList" type="info">重置结果</el-button>
    <Dialog ref="insertDialog" :title="insertDialogTitle" :submitHandler="insertTeacher"></Dialog>
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
  data() {
    return {
      insertDialogTitle: '添加教师',
      queryDialogTitle: '查询教师',
    }
  },
  methods: {
    openInsertTeacherDialog() {
      this.$refs.insertDialog.setVisable();
    },
    openQueryTeacherDialog() {
      this.$refs.queryDialog.setVisable();
    },
    insertTeacher(formData) {
      insertTeacher(formData).then(response => {
        // 处理添加教师成功的逻辑
        console.log(response);
      })
    },
    queryTeacher(formData) {
      queryTeacher(formData).then(response => {
        // 处理查询教师成功的逻辑
        this.$emit('operation-complete', response.data.data);
      })
    },
    refrashTeacherList() {
      getList().then(response =>{
        this.$emit('operation-complete', response.data.data);
      })
    },

  }
}
</script>
