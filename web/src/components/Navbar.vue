<!---->
<template>
    <div class="navbar">
        <el-menu :default-active="route.fullPath" class="el-menu-demo" mode="horizontal" :router="true">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/news">新闻中心</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="/" @click="handleClick">登录</el-menu-item>
        </el-menu>
        <div class="right">门户官网</div>
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()


const handleClick = () => {
    // 函数体
    window.location.href = 'http://localhost:5173/#/login'
}
</script>

<style lang='scss' scoped>
.navbar {
    position: sticky;
    top: 0;
    z-index: 9999;
}

.right {
    position: fixed;
    top: 0;
    right: 20px;
    width: 100px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    font-size: 14px;
}
</style>