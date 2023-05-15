<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="教师姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="教师性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="年龄" prop="age" :rules="[
                    { type: 'number', message: '年龄必须为数字值' }
                ]">
                    <el-input v-model.number="form.age" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="所授科目">
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
                <el-button @click="dialogFormVisible = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="onSubmit" size="medium">提 交</el-button>
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
        }
    },
    data() {
        return {
            form: {
                name: '',
                sex: '',
                age: '',
                major: ''
            },
            dialogFormVisible: false
        }
    },
    methods: {
        onSubmit() {
            // 在提交表单时调用传入的 submitHandler 方法
            if (this.submitHandler) {
                this.submitHandler(this.form);
                // console.log(this.submitHandler)
            }
            // 其他处理逻辑...
        },
        setVisable() {
            this.dialogFormVisible = true
        },
        setUnVisable() {
            this.dialogFormVisible = false
        }
    }
}
</script>