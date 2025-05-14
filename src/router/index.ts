import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FindProvider from '@/views/FindProvider.vue'
import FindTasks from '@/views/FindTasks.vue'
import PostTask from '@/views/PostTask.vue'
import BecomeProvider from '@/views/BecomeProvider.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ProviderDetail from '@/views/ProviderDetail.vue'
import TaskDetail from '@/views/TaskDetail.vue'
import Terms from '@/views/Terms.vue'
import Information from '@/views/Information.vue'
import Orders from '@/views/Orders.vue'

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
      path: '/becomeProvider',
      name: 'BecomeProvider',
      component: BecomeProvider
    },
    {
      path: '/providers',
      name: 'providers',
      component: FindProvider
    },
    {
      path: '/providers/:providerId',
      name: 'providerDetail',
      component: ProviderDetail,
      props: true
    },
    {
      path: '/postTask',
      name: 'PostTask',
      component: PostTask
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: FindTasks
    },
    {
      path: '/tasks/:taskId',
      name: 'taskDetail',
      component: TaskDetail,
      props: true
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
      path: '/order',
      name: 'order',
      component: Orders,
    }

  ]
})

export default router
