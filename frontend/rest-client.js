import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.js'

import UserView from './Views/UserView.js'
import SchoolView from './Views/SchoolView.js'
//import SchoolView from './views/SchoolView.js'

const routes = [
    { path: "/schools", component: SchoolView },
    { path: "/users", component: UserView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

const app = createApp(App)

app.use(router)

app.config.globalProperties.API_URL = 'http://localhost:8080'
app.mount('#app')