const NewsSevers = require("../../services/admin/NewsService")

const NewsController = {
    add: async (req, res) => {
        // 调用service进行添加
        // console.log(req.body, req.file);
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, content, category, isPublish } = req.body
        await NewsSevers.add({ title, content, category: Number(category), isPublish: Number(isPublish), cover, editTime: new Date() })
        res.send({
            ActionType: 'OK'
        })
    },
    getList: async (req, res) => {
        // 函数体
        // console.log(req.params.id);
        const result = await NewsSevers.getList({ _id: req.params.id })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    delList: async (req, res) => {
        // 函数体
        await NewsSevers.delList({ _id: req.params.id })
        res.send({
            ActionType: 'OK',
        })
    },
    updateList: async (req, res) => {
        // 函数体
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, content, category, isPublish, _id } = req.body
        await NewsSevers.updateList({ _id, title, content, category: Number(category), isPublish: Number(isPublish), cover, editTime: new Date() })
        res.send({
            ActionType: 'OK'
        })
    },
    publish: async (req, res) => {
        // 函数体
        await NewsSevers.publish({
            ...req.body,
            editTime: new Date()
        })
        res.send({
            ActionType: 'OK',
        })
    }
}
module.exports = NewsController