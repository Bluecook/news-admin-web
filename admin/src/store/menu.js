import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            iscollapse: false,
            isGetterRouter: false
        }
    },

    getters: {},

    actions: {
        changeCollapse() {
            this.iscollapse = !this.iscollapse
        },
        changeGetterRouter(value) {
            // console.log('我调用了');
            this.isGetterRouter = value
        }
    },
    // persist: true,
    persist: {
        storage: localStorage,
        paths: ['iscollapse'],
    },

})