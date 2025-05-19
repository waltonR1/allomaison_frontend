import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProviderFind from '@/views/ProviderFind.vue'
import TaskFind from '@/views/TaskFind.vue'
import TaskPost from '@/views/TaskPost.vue'
import ProviderBecome from '@/views/ProviderBecome.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ProviderDetail from '@/views/ProviderDetail.vue'
import TaskDetail from '@/views/TaskDetail.vue'
import Terms from '@/views/Terms.vue'
import Information from '@/views/Information.vue'
import OrderList from '@/views/OrderList.vue'
import OrderDetail from '@/views/OrderDetail.vue'
import ChatView from '@/views/ChatView.vue'
import TaskList from '@/views/TaskList.vue'
import TaskInfo from '@/views/TaskInfo.vue'
import ProviderInfo from '@/views/InfoProvider.vue'

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
      name: 'ProviderBecome',
      component: ProviderBecome
    },
    {
      path: '/providers',
      name: 'providers',
      component: ProviderFind
    },
    {
      path: '/providers/:providerId',
      name: 'providerDetail',
      component: ProviderDetail,
      props: true
    },
    {
      path: '/postTask',
      name: 'TaskPost',
      component: TaskPost
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskFind
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
        { path: 'information', name: 'Information', component: Information },
        { path: 'providerInfo',name: 'providerInfo', component: ProviderInfo}
      ],
      redirect: '/auth/login'
    },
    {
      path: '/order',
      name: 'order',
      component: OrderList,
    },
    {
      path: '/order/:orderId',
      name: 'orderDetail',
      component: OrderDetail,
      props: true
    },
    {
      path: '/myTask',
      name: 'myTask',
      component: TaskList,
    },
    {
      path: '/myTask/:taskId',
      name: 'taskInfo',
      component: TaskInfo,
      props: true
    },
    {
      path:'/chat',
      name:'chat',
      component: ChatView
    }

  ]
})

export default router
