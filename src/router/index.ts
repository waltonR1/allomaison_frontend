import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FindServices from '@/views/FindServices.vue'
import FindRequests from '@/views/FindRequests.vue'
import PostRequest from '@/views/PostRequest.vue'
import BecomeProvider from '@/views/BecomeProvider.vue'
import Login           from '@/views/Login.vue'
import Register        from '@/views/Register.vue'
import ServiceDetail    from '@/views/ServiceDetail.vue'
import RequestDetail   from '@/views/RequestDetail.vue'

// import LoginRegister from '@/views/LoginRegister.vue'
// import OldHome from  '@/components/Home.vue'

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
      path: '/findRequests',
      name: 'FindRequests',
      component: FindRequests
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
      path: '/services/:id',
      name: 'serviceDetail',
      component: ServiceDetail,
      props: true
    },
    {
      path: '/requests/:id',
      name: 'requestDetail',
      component: RequestDetail,
      props: true
    }


    // {
    //   path: '/login',
    //   name: 'LoginRegister',
    //   component: LoginRegister
    // },
    // {
    //   path:'/oldhome',
    //   component:OldHome,
    // }
  ],
})

export default router
