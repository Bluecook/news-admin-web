<!---->
<template>
    <el-card>
        <el-page-header content="新闻列表" icon="" title="新闻管理" />
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="category" label="分类">
                <template #default="scope">
                    {{ categoryFormat(scope.row.category) }}
                </template>
            </el-table-column>
            <el-table-column label="更新时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }}
                </template>
            </el-table-column>
            <el-table-column label="是否发布">
                <template #default="scope">
                    <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                        @change="handleSwitchChange(scope.row)" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" circle :icon="Star" type="success"
                        @click="handlePreview(scope.row)"></el-button>
                    <el-button size="small" circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>

                    <el-popconfirm title="确认删除嘛？" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)">
                        <template #reference>
                            <el-button size="small" circle :icon="Delete" type="danger"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog title="预览新闻" width="50%" v-model="dialogVisible">
        <div>
            <h2>{{ previewData.title }}</h2>
            <p style="margin-top: 5px;">{{ formatTime.getTime(previewData.editTime) }}</p>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="previewData.content" class="htmlContent"></div>
        </div>
    </el-dialog>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref, toRefs, onMounted } from 'vue'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import formatTime from '../../util/formatTime'

const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)

onMounted(() => {
    // 函数体
    getTableDate()
})

const getTableDate = async () => {
    // 函数体
    const res = await axios.get('/adminapi/news/list')
    // console.log(res.data);
    tableData.value = res.data.data
}

// 格式化分类信息
const categoryFormat = (category) => {
    // 函数体
    const arr = ['最新动态', '典型案例', '通告公共']
    return arr[category - 1]
}

const handleSwitchChange = async (item) => {
    // 函数体
    await axios.put(`/adminapi/news/publish`, { _id: item._id, isPublish: item.isPublish })
    await getTableDate()
}

//预览回调
const handlePreview = (data) => {
    // 函数体
    previewData.value = data
    dialogVisible.value = true
}

//删除回调
const handleDelete = async (item) => {
    // 函数体
    // console.log(item);
    await axios.delete(`/adminapi/news/list/${item._id}`)
    await getTableDate()
}

const router = useRouter()
const handleEdit = (item) => {
    // 函数体
    // 跳转到/news-message/editnews/:id
    router.push(`/news-manage/editnews/${item._id}`)
}
</script>

<style scoped lang="scss">
.el-table {
    margin-top: 20px;
}

:deep(.htmlContent) img {
    max-width: 100%;
}
</style>