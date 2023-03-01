const UserService = require("../../services/admin/UserService")
const JWT = require('../../util/JWT')
const UserController = {
    login: async (req, res) => {
        // req.body
        // console.log(req.body);
        let result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: '用户名密码不匹配'
            })
        } else {
            // 生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username,

            }, '1d')
            res.header("Authorization", token)
            res.send({
                ActionType: 'OK',
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,//性别 0,1,2
                    introduction: result[0].introduction,//简介
                    avatar: result[0].avatar,
                    role: result[0].role,//管理员1，编辑2
                }
            })
            return
        }
        // 
    },
    upload: async (req, res) => {
        // npm
        // console.log(req.body, req.file);
        const { username, gender, introduction } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        // 调用service模块更新 数据
        const token = req.headers['authorization'].split(" ")[1];
        let payload = JWT.verify(token)

        await UserService.upload({ _id: payload._id, username, gender: Number(gender), introduction, avatar })
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction, gender: Number(gender), avatar
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction, gender: Number(gender)
                }
            })
        }
    },
    add: async (req, res) => {
        // npm
        // console.log(req.body, req.file);
        const { username, gender, introduction, role, password } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        await UserService.add({ username, gender: Number(gender), introduction, avatar, role: Number(role), password })
        res.send({
            ActionType: "OK",
        })
    },
    getList: async (req, res) => {
        // 函数体
        const result = await UserService.getList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    putList: async (req, res) => {
        // 函数体
        const result = await UserService.putList(req.body)
        res.send({
            ActionType: "OK"
        })
    },
    delList: async (req, res) => {
        // 函数体
        console.log(req.params.id);
        const result = await UserService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            data: result
        })
    },

}

module.exports = UserController