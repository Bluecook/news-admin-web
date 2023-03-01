<!---->
<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <h2>{{ currentNews.title }}</h2>
            <div class="time">{{ formatTime.getTime(currentNews.editTime) }}</div>
            <el-divider border-style="dashed" />
            <div v-html="currentNews.content"></div>
        </el-col>
        <el-col :span="4" :push="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>最近新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" :key="item._id" class="text item" style="padding: 5px;"
                    @click="handleChange(item._id)">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                        <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref, toRefs, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import formatTime from '../util/formatTime'
import { round } from 'lodash';

const route = useRoute()
const router = useRouter()
const currentNews = ref({})
const topNews = ref([])

const stop = watchEffect(async () => {
    // 函数体
    if (!route.params.id) return
    const res = await axios.get(`/webapi/news/list/${route.params.id}`)
    const resulet = await axios.get(`/webapi/news/toplist?limit=4`)
    // console.log(res.data.data);
    if (res.data.data.length === 0) return router.push('/home')
    currentNews.value = res.data.data[0]
    topNews.value = resulet.data.data
})
onBeforeUnmount(() => {
    // 函数体
    stop()
})

const handleChange = (id) => {
    // 函数体
    router.push(`/new/${id}`)
}
</script>

<style lang='scss' scoped>
.el-row {
    margin-top: 20px;
}
</style>