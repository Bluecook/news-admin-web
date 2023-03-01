<!---->
<template>
    <div class="container">
        <el-carousel height="calc(100vh - 59px)">
            <el-carousel-item v-for="(item, index) in 3" :key="item">
                <div :style="{ backgroundImage: `url(${imgUrl[index]})` }">
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from 'vue'
import home1 from '../assets/home1.jpg'
import home2 from '../assets/home2.jpg'
import home3 from '../assets/home3.jpg'

const imgUrl = [home1, home2, home3]
</script>

<style scoped lang="scss">
.el-carousel div {
    width: 100%;
    height: 100%;
    background-size: cover;
}
</style>