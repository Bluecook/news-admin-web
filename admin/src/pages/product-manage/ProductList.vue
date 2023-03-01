<!---->
<template>
    <el-card>
        <el-page-header content="产品列表" icon="" title="产品管理" />
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="产品名称" />
            <el-table-column prop="introduction" label="简要描述" />
            <el-table-column label="更新时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
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
</template>

<script setup>
import axios from 'axios';
import { reactive, ref, toRefs, onMounted } from 'vue'
import { Edit, Delete, } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import formatTime from '../../util/formatTime'

const tableData = ref([])

onMounted(() => {
    // 函数体
    getTableDate()
})

const getTableDate = async () => {
    // 函数体
    const res = await axios.get('/adminapi/product/list')
    // console.log(res.data);
    tableData.value = res.data.data
}


//删除回调
const handleDelete = async (item) => {
    // 函数体
    // console.log(item);
    await axios.delete(`/adminapi/product/list/${item._id}`)
    await getTableDate()
}

const router = useRouter()
const handleEdit = (item) => {
    // 函数体
    // 跳转到/news-message/editnews/:id
    router.push(`/product-manage/editproduct/${item._id}`)
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