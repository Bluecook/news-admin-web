<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理" />
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
            <el-form-item label="头像" prop="avatar">
                <UploadAvatar :avatar="userForm.avatar" @avatarChange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">添加用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>

import { reactive, ref, toRefs } from 'vue'
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar.vue';
import upload from '../../util/upload';
import { useRouter } from 'vue-router'
const userFormRef = ref()
const userForm = reactive({
    username: '',
    password: '',
    gender: 0,//保密
    role: 2,//1是管理员，2编辑
    introduction: '',
    avatar: '',
    file: null
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
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})

const handleChange = file => {
    // 函数体
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}
const router = useRouter()
const submitForm = () => {
    // 函数体
    userFormRef.value.validate(async (valid) => {
        // 函数体
        if (valid) {
            console.log(userForm);
            await upload("/adminapi/user/add", userForm)
            router.push('/user-manage/userlist')
        }
    })
}
</script>-->

<style lang="scss" scoped>
.el-form {
    margin-top: 30px;
}
</style>  