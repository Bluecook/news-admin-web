const ProductService = require('../../services/web/ProductService')

const ProductController = {
    getList: async (req, res) => {
        // 函数体
        // console.log(req.params.id);
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    topList: async (req, res) => {
        // 函数体
        // console.log(req.params.id);
        const result = await ProductService.getTopList({ limit: req.query.limit })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
}
module.exports = ProductController