<!---->
<template>
    <el-menu :collapse="menuStore.iscollapse" :collapse-transition="false" :router="true" :default-active="route.fullPath">
        <el-menu-item index="/main">
            <!-- <el-icon><icon-menu /></el-icon> -->
            <el-icon>
                <HomeFilled />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/user-center">
            <el-icon>
                <User />
            </el-icon>
            <span>个人中心</span>
        </el-menu-item>
        <el-sub-menu index="/user-manage" v-admin>
            <template #title>
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span>用户管理</span>
            </template>
            <el-menu-item index="/user-manage/useradd">
                添加用户
            </el-menu-item>
            <el-menu-item index="/user-manage/userlist">
                用户列表
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/news-mangae">
            <template #title>
                <el-icon>
                    <MessageBox />
                </el-icon>
                <span>新闻管理</span>
            </template>
            <el-menu-item index="/news-manage/newsadd">
                创建新闻
            </el-menu-item>
            <el-menu-item index="/news-manage/newslist">
                新闻列表
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/product-manage">
            <template #title>
                <el-icon>
                    <FolderOpened />
                </el-icon>
                <span>产品管理</span>
            </template>
            <el-menu-item index="/product-manage/productadd">
                添加产品
            </el-menu-item>
            <el-menu-item index="/product-manage/productlist">
                产品列表
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'
import { HomeFilled, User, UserFilled, MessageBox, FolderOpened } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '../../store/menu'
import { userInfoStore } from '../../store/userInfo'
const route = useRoute()
// console.log(route);
const userInfo = userInfoStore()
const menuStore = useMenuStore()

const vAdmin = {
    mounted(el) {
        // console.log(el);
        if (userInfo.userInfo.role !== 1) {
            el.parentNode.removeChild(el)
        }
    }
}

</script>

<style scoped>
.el-menu {
    height: 100%;
}
</style>