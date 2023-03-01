<!---->
<template>
    <el-carousel height="calc(100vh - 59px)" direction="vertical" :autoplay="false" v-if="looplist.length">
        <el-carousel-item v-for="item in looplist" :key="item._id">
            <div class="item" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <h2>{{ item.title }}</h2>
                        </div>
                    </template>
                    <div class="introduction">{{ item.introduction }}</div>
                    <div class="detail">{{ item.detail }}</div>
                    <div class="more">
                        更多请访问
                        <br />
                        https://www.baidu.com
                    </div>
                </el-card>
            </div>
        </el-carousel-item>
    </el-carousel>
    <el-empty description="暂无产品" v-else />
</template>

<script setup>
import axios from 'axios';
import { reactive, ref, toRefs, onMounted } from 'vue'

const looplist = ref([])

onMounted(async () => {
    // 函数体
    const res = await axios.get('/webapi/product/list')
    looplist.value = res.data.data
    // console.log(looplist.value);
})
</script>

<style lang='scss' scoped>
.item {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.box-card {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, .7);
    // filter: blur(5px);
    // backdrop-filter: blur(5px);
    // -webkit-backdrop-filter: blur(5px);
}

.more,
.detail,
.introduction {
    margin-top: 20px;
    // filter: blur(5px);
}
</style>