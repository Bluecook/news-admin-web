const NewsModel = require("../../models/NewsModel")

const NewsSevers = {
    getList: async ({ _id }) => {
        // 函数体
        return _id ? NewsModel.find({ _id, isPublish: 1 }) : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 })
    },
    getTopList: async ({ limit }) => {
        // 函数体
        return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit)
    },
}

module.exports = NewsSevers