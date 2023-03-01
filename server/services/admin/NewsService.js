const NewsModel = require("../../models/NewsModel")

const NewsSevers = {
    add: async ({ title, content, category, isPublish, cover, editTime }) => {
        // 数据库模型处理
        // console.log("数据库模型处理");
        return NewsModel.create({
            title, content, category, isPublish, cover, editTime
        })
    },
    getList: async ({ _id }) => {
        // 函数体
        return _id ? NewsModel.find({ _id }) : NewsModel.find({})
    },
    delList: async ({ _id }) => {
        // 函数体
        return NewsModel.deleteOne({ _id })
    },
    updateList: async ({ _id, title, content, category, isPublish, cover, editTime }) => {
        // 函数体
        if (cover) {
            return NewsModel.updateOne({ _id }, { title, content, category, isPublish, cover, editTime })
        } else {
            return NewsModel.updateOne({ _id }, { title, content, category, isPublish, editTime })
        }
    },
    publish: async ({ _id, isPublish, editTime }) => {
        // 函数体
        return NewsModel.updateOne({
            _id
        }, {
            isPublish, editTime
        })
    }
}

module.exports = NewsSevers