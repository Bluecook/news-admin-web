import { createRouter, createWebHashHistory } from "vue-router";
import pinia from '../store/index'
import { useMenuStore } from "../store/menu.js";
// import { userInfoStore } from '../store/userInfo'

import RouteConfig from './router-config.js'

// 路由组件
const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/Home/index.vue'),
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/Login/index.vue')
    },
    {
        path: '',
        redirect: { name: 'home' }
    },

]

// 注册路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 动态添加路由
/* router.addRoute('home', {
    path: '/main',
    name: 'main',
    component: () => import('../pages/MainConent/index.vue')
}) */

// const userInfo = userInfoStore(pinia)

// 路由守卫
router.beforeEach((to, from, next) => {
    const useMenu = useMenuStore()
    if (to.name === 'Login') {
        if (!localStorage.getItem('token')) {
            next()
        } else {
            next({ path: '/home' })
        }
    } else {
        // 如果授权(已经登陆过) next()
        if (!localStorage.getItem('token')) {
            next({ path: '/login' })
        } else {
            if (!useMenu.isGetterRouter) {
                // console.log("删除所有的嵌套路由");
                // 删除所有的嵌套路由
                router.removeRoute('home')
                configRouter()
                next({ path: to.fullPath })
            } else {
                next()
            }
        }
    }
})



const configRouter = () => {
    const useMenu = useMenuStore()
    // 函数体
    if (!router.hasRoute('home')) {
        router.addRoute(
            {
                path: '/home',
                name: 'home',
                component: () => import('../pages/Home/index.vue'),
            }
        )
    }
    RouteConfig.forEach(item => {
        checkPermission(item) && router.addRoute('home', item)
    })
    // 
    useMenu.changeGetterRouter(true)
}

const checkPermission = (item) => {
    // 函数体
    if (item.requireAdmin) {
        // console.log(JSON.parse(localStorage.getItem('user')).userInfo.role);
        return JSON.parse(localStorage.getItem('user')).userInfo.role === 1
    }
    return true
}


export default router
