<!---->
<template>
    <el-page-header content="编辑新闻" title="新闻管理" @back="handleBack()" />
    <el-form ref="newsrFormRef" :model="newsForm" :rules="newsFormRules" label-width="120px" class="demo-ruleForm"
        status-icon>
        <el-form-item label="标题" prop="title">
            <el-input v-model="newsForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
            <Editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content" />
        </el-form-item>
        <el-form-item label="类别" prop="category">
            <el-select v-model="newsForm.category" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
            <UploadAvatar :avatar="newsForm.cover" @avatarChange="handleAvatar" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">修改新闻</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import Editor from '../../components/editor/Editor.vue'
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar.vue';
import upload from '../../util/upload';
const newsrFormRef = ref()
const router = useRouter()
const route = useRoute()
const newsForm = reactive({
    title: '',
    content: '',
    category: 1,// 1最新动态，2 典型案情 3  通知公告
    cover: '',
    file: null,
    isPublish: 0 //0未发布，1已发布
})
const newsFormRules = {
    title: [
        { required: true, message: "请输入标题", trigger: 'blur' }
    ],
    content: [
        { required: true, message: "请输入内容", trigger: 'blur' }
    ],
    category: [
        { required: true, message: "请选择内容", trigger: 'blur' }
    ]
    , cover: [
        { required: true, message: "请上传图片", trigger: 'blur' }
    ]
}

const options = [
    { label: '最新动态', value: 1 },
    { label: '典型案例', value: 2 },
    { label: '通知公告', value: 3 },
]

// 每次editor内容改变的回调
const handleChange = (data) => {
    // 函数体
    newsForm.content = data
}


const handleAvatar = (file) => {
    // 函数体
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}


const submitForm = () => {
    // 函数体
    newsrFormRef.value.validate(async (valid) => {
        // 函数体
        if (valid) {
            // console.log(newsForm);
            // 后台
            await upload('/adminapi/news/list', newsForm)
            router.back()
        }
    })
}

const handleBack = () => {
    // 函数体
    router.back()
}

onMounted(async () => {
    // 函数体
    const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
    // console.log(res.data);
    Object.assign(newsForm, res.data.data[0])
})
</script>

<style scoped lang="scss">
.el-form {
    margin-top: 20px;
}
</style>