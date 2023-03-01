const ProductModel = require("../../models/ProductModel")

const ProductSevers = {
    getList: async ({ _id }) => {
        // 函数体
        return _id ? ProductModel.find({ _id }) : ProductModel.find({})
    },
    getTopList: async ({ limit }) => {
        // 函数体
        return ProductModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit)
    },
}

module.exports = ProductSevers