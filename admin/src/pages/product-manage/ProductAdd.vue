<template>
    <div>
        <el-page-header content="添加产品" icon="" title="产品管理" />
        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="120px"
            class="demo-ruleForm" status-icon>
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="产品简要描述" prop="introduction">
                <el-input type="textarea" v-model="productForm.introduction" />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="detail">
                <el-input type="textarea" v-model="productForm.detail" />
            </el-form-item>
            <el-form-item label="产品图片" prop="cover">
                <UploadAvatar :avatar="productForm.cover" @avatarChange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">添加产品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>

import { reactive, ref, toRefs } from 'vue'
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar.vue';
import upload from '../../util/upload';
import { useRouter } from 'vue-router'
const productFormRef = ref()
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '',
    file: null
})

const productFormRules = reactive({
    title: [
        { required: true, message: '请输入产品名称', trigger: 'blur' },
        { min: 1, max: 12, message: 'Length should be 3 to 12', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入详细描述', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传产品图片', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简要描述', trigger: 'blur' },
    ]

})

const handleChange = file => {
    // 函数体
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
}
const router = useRouter()
const submitForm = () => {
    // 函数体
    productFormRef.value.validate(async (valid) => {
        // 函数体
        if (valid) {
            // console.log(productForm);
            await upload("/adminapi/product/add", productForm)
            router.push('/product-manage/productlist')
        }
    })
}
</script>-->

<style lang="scss" scoped>
.el-form {
    margin-top: 30px;
}
</style>  