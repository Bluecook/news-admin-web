const UserModel = require("../../models/UserModel")

const UserService = {
    login: async ({ username, password }) => {
        // console.log(username, password);
        return UserModel.find({
            username, password
        })
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        // 函数体
        if (avatar) {
            return UserModel.updateOne({ _id }, { username, introduction, gender, avatar })
        } else {
            return UserModel.updateOne({ _id }, { username, introduction, gender })
        }
    },
    add: async ({ username, introduction, gender, avatar, role, password }) => {
        // 函数体
        return UserModel.create({
            username, introduction, gender, avatar, role, password
        })
    },
    getList: async ({ _id }) => {
        // 函数体
        return _id ? UserModel.find({ _id }, ['username', 'introduction', 'password', 'role']) : UserModel.find({}, ['username', 'introduction', 'gender', 'avatar', 'role'])
    },
    putList: async (body) => {
        // 函数体
        return UserModel.updateOne({ _id: body._id }, body)
    },
    delList: async ({ _id }) => {
        // 函数体
        return UserModel.deleteOne({ _id })
    },
}
module.exports = UserService