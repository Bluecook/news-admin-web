const ProductModel = require("../../models/ProductModel")

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        // 函数体
        return ProductModel.create({
            title, introduction, detail, cover, editTime
        })
    },
    getList: async ({ _id }) => {
        // 函数体
        return _id ? ProductModel.find({ _id }) : ProductModel.find({})
    },
    delList: async ({ _id }) => {
        // 函数体
        return ProductModel.deleteOne({ _id })
    },
    updateList: async ({ _id, title, cover, introduction, detail, editTime }) => {
        // 函数体
        if (cover) {
            return ProductModel.updateOne({ _id }, { title, cover, introduction, detail, editTime })
        } else {
            return ProductModel.updateOne({ _id }, { title, introduction, detail, editTime })
        }
    },
}

module.exports = ProductService