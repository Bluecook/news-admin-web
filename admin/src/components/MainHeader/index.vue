<!---->
<template>
    <el-row justify="space-between">
        <el-col :span="6">
            <el-icon size="20px" @click="expend" v-show="menuStore.iscollapse">
                <Expand />
            </el-icon>
            <el-icon size="20px" @click="expend" v-show="!menuStore.iscollapse">
                <Fold />
            </el-icon>
            <span style="margin-left: 10px;">门户管理系统</span>
        </el-col>
        <el-col :span="4">
            <span>{{ userInfo.userInfo.username }}</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon size="30px">
                        <User />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleUser">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout"> 退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </el-col>
    </el-row>
</template>

<script setup>

import { Expand, Fold, User } from '@element-plus/icons-vue';
import { useMenuStore } from '../../store/menu'
import { userInfoStore } from '../../store/userInfo';
import { useRouter } from 'vue-router';

const router = useRouter()
const menuStore = useMenuStore()
const userInfo = userInfoStore()

const expend = () => {
    menuStore.changeCollapse()
}
const handleUser = () => {
    router.push('/user-center')
}
const handleLogout = () => {
    localStorage.removeItem('token')
    userInfo.clearUserInfo()
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-row {
    height: 100%;
    align-items: center;

    .el-col-6 {
        display: flex;

        .el-icon {
            cursor: pointer;
            margin: auto;
        }
    }

    .el-col-4 {
        display: flex;

        .el-drown {
            margin: auto;
            cursor: pointer;
        }
    }
}
</style>