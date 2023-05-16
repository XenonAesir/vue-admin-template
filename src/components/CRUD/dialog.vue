<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="教师姓名" prop="name">
                    <el-input v-model.trim="form.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="教师性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="form.age" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="所授科目" prop="major">
                    <el-select v-model="form.major" placeholder="请选择所授科目">
                        <el-option label="数学" value="数学"></el-option>
                        <el-option label="语文" value="语文"></el-option>
                        <el-option label="英语" value="英语"></el-option>
                        <el-option label="物理" value="物理"></el-option>
                        <el-option label="化学" value="化学"></el-option>
                        <el-option label="生物" value="生物"></el-option>
                        <el-option label="历史" value="历史"></el-option>
                        <el-option label="政治" value="政治"></el-option>
                        <el-option label="地理" value="地理"></el-option>
                        <el-option label="体育" value="体育"></el-option>
                        <el-option label="微机" value="微机"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button plain @click="setUnVisable(), resetForm('form')" size="medium">取 消</el-button>
                <el-button plain type="info" @click="resetForm('form')" size="medium">重 置</el-button>
                <el-button plain type="primary" @click="onSubmit" size="medium">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'Dialog',
    props: {
        title: {
            type: String,
            default: '信息表单'
        },
        submitHandler: {
            type: Function,
            required: true
        },
        needValidForm: {
            type: Boolean,
            default: false
        },
        rules: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            form: {
                // 不可使用null作为初始值
                name: '',
                sex: '',
                age: '',
                major: ''
            },
            dialogFormVisible: false,

        }
    },
    methods: {
        onSubmit() {
            if (this.submitHandler) {
                if (this.needValidForm) {
                    // 使用验证规则
                    if (this.validForm('form')) {
                        this.submitHandler(this.form)
                    }
                } else {
                    // 不使用验证规则
                    this.submitHandler(this.form);
                }
            }
            // 其他处理逻辑...
        },
        setVisable() {
            this.dialogFormVisible = true
        },
        setUnVisable() {
            this.dialogFormVisible = false
        },
        validForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    return true
                } else {
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },

}
</script>