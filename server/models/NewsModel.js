const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsType = {
    title: String,
    content: String,
    category: Number,//类型 0,1,2
    cover: String,//封面
    isPublish: Number,//未发布，已发布
    editTime: Date,//
}

const NewsModel = mongoose.model("news", new Schema(NewsType))
module.exports = NewsModel