<!---->
<template>
    <el-container style="height: 100%;">
        <el-aside :width="menuStore.iscollapse ? '64px' : '200px'"><main-menu></main-menu></el-aside>
        <el-container>
            <el-header>
                <main-header></main-header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import MainMenu from '../../components/MainMenu/index.vue'
import MainHeader from '../../components/MainHeader/index.vue'

import { useMenuStore } from '../../store/menu';
const menuStore = useMenuStore()
</script>

<style scoped>
.el-aside {
    height: 100%;
}

.el-main {
    overflow: auto;
    height: calc(100vh-60px);
}

.el-header {
    background-color: var(--el-color-primary-light-9);
}
</style>