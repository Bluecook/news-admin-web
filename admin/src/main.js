import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import Particles from "particles.vue3";
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './util/axios.config'

const pinia = createPinia()


const app = createApp(App)

// 挂载pinia
app.use(pinia)
pinia.use(piniaPluginPersistedstate)

// 路由挂载
app.use(router)

app.use(Particles)


app.mount('#app')


