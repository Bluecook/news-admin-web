<!---->
<template>
    <el-page-header content="首页" icon="" title="门户管理系统">

    </el-page-header>
    <el-card class="box-card">
        <el-row>
            <el-col :span="4"><el-avatar :size="50" :src="avatarUrl" /></el-col>
            <el-col :span="18" :offset="2">
                <h3>欢迎{{ userInfo.userInfo.username }}回来</h3>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公司产品</span>
            </div>
        </template>
        <el-carousel v-if="loopList.length" :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in loopList" :key="item._id">
                <div class="loop" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                    <h3 text="2xl" justify="center">{{ item.title }}</h3>
                </div>
            </el-carousel-item>
        </el-carousel>
    </el-card>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from 'vue'
import axios from 'axios';
import { computed } from 'vue';
import { userInfoStore } from '../../store/userInfo';

const userInfo = userInfoStore()
const loopList = ref([])

const avatarUrl = computed(() => userInfo.userInfo.avatar ? 'http://localhost:3000' + userInfo.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)

onMounted(() => {
    // 函数体
    getTableDate()
})

const getTableDate = async () => {
    // 函数体
    const res = await axios.get('/adminapi/product/list')
    // console.log(res.data);
    loopList.value = res.data.data
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 15px;
}

.el-row {
    align-items: center;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.loop {
    width: 100%;
    height: 100%;
    background-size: cover;
}
</style>