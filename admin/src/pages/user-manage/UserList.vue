<!---->
<template>
    <el-card>
        <el-page-header content="用户列表" icon="" title="用户管理" />
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="username" label="用户名" />
            <el-table-column label="头像">
                <template #default="scope">
                    <div v-if="scope.row.avatar">
                        <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                    </div>
                    <div v-else>
                        <el-avatar :size="50"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角色">
                <template #default="scope">
                    <el-tag type="danger" v-if="scope.row.role === 1">管理员</el-tag>
                    <el-tag type="success" v-else>编辑</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm title="确认删除嘛？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" class="demo-ruleForm"
            status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" type="password" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role" placeholder="Select" class="m-2" style="width:100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
                <el-input type="textarea" v-model="userForm.introduction" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEditConfim">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue'
import axios from 'axios';
const tableData = ref([])
const dialogVisible = ref(false)
const userFormRef = ref()
let userForm = reactive({
    username: '',
    password: '',
    role: 2,//1是管理员，2编辑
    introduction: '',
})
const options = [
    { label: '管理员', value: 1 },
    { label: '编辑', value: 2 },
]
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 1, max: 12, message: 'Length should be 3 to 12', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入个人简介', trigger: 'blur' },
    ],
})
onMounted(() => {
    // 函数体
    getTableData()
})
const getTableData = async () => {
    // 函数体
    const res = await axios.get("/adminapi/user/list")
    tableData.value = res.data.data
    // console.log(res.data);
}
// 编辑回调
const handleEdit = async (data) => {
    // 函数体
    // console.log(data);
    const result = await axios.get(`/adminapi/user/list/${data._id}`)
    // userForm = result.data.data[0]
    Object.assign(userForm, result.data.data[0])
    dialogVisible.value = true

}
// 编辑确认回调
const handleEditConfim = () => {
    // 函数体
    userFormRef.value.validate(async (valid) => {
        // 函数体
        if (valid) {
            // 1-更新
            await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
            // 2-dialog隐藏
            dialogVisible.value = false
            // 获取table数据
            getTableData()
        }
    })
}
// 删除回调
const handleDelete = async (data) => {
    // 函数体
    // console.log(data);
    await axios.delete(`/adminapi/user/list/${data._id}`)
    // reload page reload data tabledata 本地删除
    getTableData()
}


</script>

<style scoped lang="scss">
.el-table {
    margin-top: 20px;
}
</style>