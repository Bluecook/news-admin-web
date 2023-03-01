<!---->
<template>
    <el-page-header content="个人中心" icon="" title="门户管理系统" />
    <el-row :gutter="20">
        <el-col :span="8">
            <el-card class="box-card">
                <el-avatar :size="50" :src="avatarUrl" />
                <h4>{{ userStore.userInfo.username }}</h4>
                <h4>{{ userStore.userInfo.role == 1 ? '管理员' : '普通用户' }}</h4>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>个人信息</span>
                    </div>
                </template>
                <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px"
                    class="demo-ruleForm" status-icon>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="userForm.gender" placeholder="Select">
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
                        <el-button type="primary" @click="submitForm">更新</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

        </el-col>
    </el-row>
</template>

<script  setup>
import { reactive, ref, toRefs } from 'vue'
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar.vue';
import { computed } from 'vue';
import { userInfoStore } from '../../store/userInfo';
import { Plus } from '@element-plus/icons-vue'
import upload from '../../util/upload';
const userStore = userInfoStore()
const avatarUrl = computed(() => userStore.userInfo.avatar ? 'http://localhost:3000' + userStore.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)

const userFormRef = ref()
const userForm = reactive({
    username: userStore.userInfo.username,
    gender: userStore.userInfo.gender,
    introduction: userStore.userInfo.introduction,
    avatar: userStore.userInfo.avatar,
    file: null//
})
// 性别选项
const options = [
    { label: '保密', value: 0 },
    { label: '男', value: 1 },
    { label: '女', value: 2 }
]

const userFormRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 8, message: 'Length should be 3 to 5', trigger: 'blur' },
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

// 每次选择完图片之后的回调
const handleChange = (file) => {
    // console.log(file);
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

// 更新提交
const submitForm = () => {
    // 函数体
    userFormRef.value.validate(async (valid) => {
        // 函数体
        if (valid) {
            // console.log('submit', userForm);
            const result = await upload('adminapi/user/upload', userForm)
            // console.log(res.data);
            if (result.ActionType === 'OK') {
                userStore.changeUserInfo(result.data)
                ElMessage.success("更新成功")
            }

        }
    })
}
</script>

<style scoped lang="scss">
.el-row {
    margin-top: 15px;

    .el-col-8 {
        .box-card {
            text-align: center;
        }
    }
}
</style>