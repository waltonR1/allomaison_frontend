import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FindProvider from '@/views/FindProvider.vue'
import FindRequests from '@/views/FindRequests.vue'
import PostTask from '@/views/PostTask.vue'
import BecomeProvider from '@/views/BecomeProvider.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ProviderDetail from '@/views/ProviderDetail.vue'
import RequestDetail from '@/views/RequestDetail.vue'
import Terms from '@/views/Terms.vue'
import Information from '@/views/information.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/findProvider',
      name: 'FindProvider',
      component: FindProvider
    },
    {
      path: '/findRequests',
      name: 'FindRequests',
      component: FindRequests
    },
    {
      path: '/postTask',
      name: 'PostTask',
      component: PostTask
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
        { path: 'login', name: 'Login', component: Login },
        { path: 'register', name: 'Register', component: Register },
        { path: 'terms', name: 'Terms', component: Terms },
        { path: 'information', name: 'Information', component: Information }
      ],
      redirect: '/auth/login'
    },
    {
      path: '/provider/:id',
      name: 'providerDetail',
      component: ProviderDetail,
      props: true
    },
    {
      path: '/requests/:id',
      name: 'requestDetail',
      component: RequestDetail,
      props: true
    }

  ]
})

export default router
