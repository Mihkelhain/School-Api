import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import GroupView from './Views/GroupView.js'
import LessonView from './Views/LessonView.js'
//import LessonView from './views/LessonView.js'

const routes = [
    { path: "/lessons", component: LessonView },
    { path: "/groups", component: GroupView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')