import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FindServices from '@/views/FindServices.vue'
import PostRequest from '@/views/PostRequest.vue'
import BecomeProvider from '@/views/BecomeProvider.vue'
import Login           from '@/views/Login.vue'
import Register        from '@/views/Register.vue'

import LoginRegister from '@/views/LoginRegister.vue'
import OldHome from  '@/components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path:'/home',
      name:'Home',
      component:HomeView,
    },
    {
      path: '/findServices',
      name: 'FindServices',
      component: FindServices
    },
    {
      path: '/postRequest',
      name: 'PostRequest',     
      component: PostRequest
    },
    {
      path: '/becomeProvider',
      name: 'BecomeProvider',
      component: BecomeProvider
    },
    {
      path: '/auth',
      component: RouterView, // 简单占位
      children: [
        { path: 'login',    name: 'Login',    component: Login    },
        { path: 'register', name: 'Register', component: Register }
      ]
    },


    {
      path: '/login',
      name: 'LoginRegister',
      component: LoginRegister
    },
    {
      path:'/oldhome',
      component:OldHome,
    }
  ],
})

export default router
