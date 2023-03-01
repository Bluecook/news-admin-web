import { defineStore } from 'pinia'

export const userInfoStore = defineStore('user', {
    state: () => {
        return {
            userInfo: {}
        }
    },
    getters: {

    },
    actions: {
        changeUserInfo(value) {
            this.userInfo = {
                ...this.userInfo,
                ...value
            }
        },
        clearUserInfo() {
            this.userInfo = {}
        }
    },
    persist: true,
})
