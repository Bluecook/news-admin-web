const NewsSevers = require("../../services/web/NewsService")

const NewsController = {
    getList: async (req, res) => {
        // 函数体
        // console.log(req.params.id);
        const result = await NewsSevers.getList({ _id: req.params.id })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    topList: async (req, res) => {
        // 函数体
        // console.log(req.params.id);
        const result = await NewsSevers.getTopList({ limit: req.query.limit })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
}
module.exports = NewsController