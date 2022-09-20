import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    // {
    //     path:'',
    //     redirect:'/home'
    // },
    // 重定向
    {
        path: '/',
        name: 'Main',
        component: () => import('../src/views/Main.vue'),
        children:[
            // {
            //     path:'/home',
            //     name:'home',
            //     component:() => import('../src/views/home')
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('../src/views/User')
            // },
            // {
            //     path: '/mall',
            //     name: 'mall',
            //     component: () => import('../src/views/mall')
            // },
            // {
            //     path: '/page1',
            //     name: 'page1',
            //     component: () => import('../src/views/other/pageOne.vue')
            // },
            // {
            //     path: '/page2',
            //     name: 'page2',
            //     component: () => import('../src/views/other/pageTwo.vue')
            // },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() => import('../src/views/Login/login.vue')
    }
    
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
