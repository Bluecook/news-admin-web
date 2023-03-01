const ProductService = require("../../services/admin/ProductService")

const ProductController = {
    add: async (req, res) => {
        // 函数体
        const { title, introduction, detail, } = req.body
        const cover = req.file ? `/productuploads/${req.file.filename}` : ''
        await ProductService.add({ title, introduction, detail, cover, editTime: new Date() })
        res.send({
            ActionType: "OK",
        })
    },
    getList: async (req, res) => {
        // 函数体
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    updateList: async (req, res) => {
        // 函数体
        const cover = req.file ? `/productuploads/${req.file.filename}` : ''
        const { title, introduction, detail, _id } = req.body
        await ProductService.updateList({ _id, title, cover, introduction, detail, editTime: new Date() })
        res.send({
            ActionType: 'OK'
        })
    },
    // putList: async (req, res) => {
    //     // 函数体
    //     const result = await UserService.putList(req.body)
    //     res.send({
    //         ActionType: "OK"
    //     })
    // },
    delList: async (req, res) => {
        // 函数体
        // console.log(req.params.id);
        const result = await ProductService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    }
}



module.exports = ProductController