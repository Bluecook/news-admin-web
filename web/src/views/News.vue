<!---->
<template>
    <div class="container">
        <div class="news-header" :style="{ backgroundImage: `url(${newbg})` }"></div>
        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" placeholder="请输入新闻关键字" clearable size="large" @blur="visible = false"
                        @input="visible = true" />
                </template>
                <div v-if="searchnewslist.length">
                    <div class="search-item" v-for="data in searchnewslist" :key="data._id"
                        @click="handleChangePage(data._id)">{{ data.title }}</div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="50" />
                </div>
            </el-popover>
        </div>

        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewsList" :key="item._id">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(item._id)">
                        <img :src="`http://localhost:3000${item.cover}`" class="image" />
                        <div style="padding: 14px">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ formatTime.getTime(item.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-tabs v-model="whichTab" class="demo-tabs" style="margin: 20px;">
            <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div v-for="data in tabnews[item.name]" :key="data._id" style="margin: 10px;">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangePage(data._id)">
                                <img :src="`http://localhost:3000${data.cover}`" class="tab-image" />
                                <div style="padding: 14px">
                                    <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="time">{{ formatTime.getTime(data.editTime) }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline>
                            <el-timeline-item v-for="(data, index) in tabnews[item.name]" :key="index"
                                :timestamp="formatTime.getTime(item.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>

            </el-tab-pane>
        </el-tabs>
        <el-backtop :right="100" :bottom="80" :visibility-height="120" />
    </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted, computed } from 'vue'
import newbg from '../assets/newsbg.jpg'
import axios from 'axios'
import formatTime from '../util/formatTime';
import { useRouter } from 'vue-router'
import _ from 'lodash'

const router = useRouter()
const searchText = ref("")
const visible = ref(false)
const newsList = ref([])

const whichTab = ref(1)

onMounted(async () => {
    // 函数体
    let res = await axios.get('/webapi/news/list')
    // console.log(res.data.data);
    newsList.value = res.data.data
})

const searchnewslist = computed(() => searchText.value ? newsList.value.filter(item => item.title.includes(searchText.value)) : [])

const topNewsList = computed(() => newsList.value.slice(0, 4))

const tablist = [
    { label: "最新动态", name: 1 },
    { label: "典型案例", name: 2 },
    { label: "通知公告", name: 3 }
]

const tabnews = computed(() => _.groupBy(newsList.value, item => item.category))

const handleChangePage = (id) => {
    // 函数体
    router.push(`/new/${id}`)
}
</script>

<style lang='scss' scoped>
.container {
    position: relative;

    .news-header {
        width: 100%;
        height: 400px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .search {
        position: absolute;
        top: 300px;
        width: 100%;
        text-align: center;

        .el-input {
            width: 50%;
        }


    }

    .search-item {
        height: 50px;
        line-height: 50px;

        &:hover {
            background: silver;
            color: skyblue;
        }
    }

    .topnews {
        margin: 20px;

        .image {
            width: 100%;
            display: block;
        }

        .time {
            font-size: 12px;
            color: #999;
        }
    }
}

.tab-image {
    width: 150px;
    height: 150px;
    display: block;
}

.el-tabs {
    :deep(.el-card__body) {
        display: flex;
        align-items: flex-end;
    }

    .time {
        font-size: 12px;
        color: #999;
    }
}
</style>