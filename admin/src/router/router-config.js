const routers = [
    {
        path: '/main',
        name: 'main',
        component: () => import('../pages/MainConent/index.vue')
    },
    {
        path: '/user-center',
        name: 'UserCenter',
        component: () => import('../pages/user-center/index.vue')
    },
    {
        path: '/user-manage/useradd',
        name: 'UserAdd',
        component: () => import('../pages/user-manage/UserAdd.vue'),
        requireAdmin: true
    },
    {
        path: '/user-manage/userlist',
        name: 'UserList',
        component: () => import('../pages/user-manage/UserList.vue'),
        requireAdmin: true
    },
    {
        path: '/news-manage/newsadd',
        name: 'NewsAdd',
        component: () => import('../pages/news-manage/NewsAdd.vue')
    },
    {
        path: '/news-manage/newslist',
        name: 'NewsList',
        component: () => import('../pages/news-manage/NewsList.vue')
    },
    {
        path: '/news-manage/editnews/:id',
        name: 'NewsEdit',
        component: () => import('../pages/news-manage/NewsEdit.vue')
    },
    {
        path: '/product-manage/productadd',
        name: 'ProductAdd',
        component: () => import('../pages/product-manage/ProductAdd.vue')
    },
    {
        path: '/product-manage/productlist',
        name: 'ProductList',
        component: () => import('../pages/product-manage/ProductList.vue')
    },
    {
        path: '/product-manage/editproduct/:id',
        name: 'ProductEdit',
        component: () => import('../pages/product-manage/ProductEdit.vue')
    },
    {
        path: '/home',
        redirect: { name: 'main' }
    },

    {
        path: '/:pathMatch(.*)*',
        component: () => import('../components/NotFound/index.vue')
    }
]

export default routers