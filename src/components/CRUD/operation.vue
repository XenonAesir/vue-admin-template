<template>
  <div style="vertical-align: middle;">
    <el-button plain size="small" @click="openInsertTeacherDialog" type="primary">添加教师</el-button>
    <el-button plain size="small" @click="openQueryTeacherDialog">查询教师</el-button>
    <el-button plain size="small" @click="refrashTeacherList" type="info">重置结果</el-button>
    <Dialog ref="insertDialog" :title="insertDialogTitle" :submitHandler="insertTeacher" :needValidForm="true" :rules="rules"></Dialog>
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
    openInsertTeacherDialog() {
      this.$refs.insertDialog.setVisable();
    },
    openQueryTeacherDialog() {
      this.$refs.queryDialog.setVisable();
    },
    closeInsertTeacherDialog() {
      this.$refs.insertDialog.setUnVisable();
    },
    closeQueryTeacherDialog() {
      this.$refs.queryDialog.setUnVisable();
    },
    insertTeacher(formData) {
      insertTeacher(formData).then(response => {
        // 处理添加教师成功的逻辑
        console.log(response);
        this.closeInsertTeacherDialog()
      })
    },
    queryTeacher(formData) {
      queryTeacher(formData).then(response => {
        // 处理查询教师成功的逻辑
        this.$emit('operation-complete', response.data.data)
        this.$message({
          message: '查询完成',
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
