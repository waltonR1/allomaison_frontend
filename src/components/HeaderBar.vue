<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Router from '@/router'

import { useThemeStore } from '@/stores/themeStore.ts'
import { useUserStore } from '@/stores/userStore.ts'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

const userStore = useUserStore()
const { role,avatarUrl,userName,isLoggedIn } = storeToRefs(userStore)

const showCard = ref(false)
const showImage = ref(true)

const handleLogout = () => {
  userStore.logout()
  Router.push('/')
}

const handleImgError = () => {
  showImage.value = false
}

watch(() => avatarUrl, () => {
  showImage.value = true
})
</script>

<template>
  <header :class="[isDark ? 'bg-gray-800' : 'bg-white','px-6 py-4 shadow flex justify-between items-center sticky top-0 z-10 transition duration-500']">

    <h1 :class="[isDark ? 'text-amber-600' : 'text-amber-400','text-3xl font-bold select-none']">
      <router-link v-if="role !== 'admin'" to="/">AlloMaison</router-link>
      <router-link v-else to="/admin">AlloMaison</router-link>
    </h1>

    <nav class="flex items-center space-x-4">
      <template v-if="role === 'admin'">
        <router-link class="hover:text-amber-500 transition select-none" to="/admin/provider">Provider Application</router-link>
        <router-link class="hover:text-amber-500 transition select-none" to="/admin/notice">Send Notice</router-link>
        <router-link class="hover:text-amber-500 transition select-none" to="/admin/account">Admin Manager</router-link>
      </template>
      <template v-else>
        <router-link v-if="role !== 'customer'" class="hover:text-amber-500 transition select-none" to="/tasks">Find Tasks</router-link>
        <router-link class="hover:text-amber-500 transition select-none" to="/providers">Find Providers</router-link>
        <router-link class="hover:text-amber-500 transition select-none" to="/postTask">Post a Task</router-link>
        <router-link v-if="role !== 'provider'" class="hover:text-amber-500 transition select-none" to="/becomeProvider">Become a Provider</router-link>
      </template>

      <template v-if="isLoggedIn">
        <div class="relative" @mouseenter="showCard = true" @mouseleave="showCard = false">
          <div class="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center border-2 border-yellow-400 shadow-md hover:shadow-xl hover:bg-gray-300 hover:scale-110">
            <img v-if="showImage && avatarUrl" :src="avatarUrl" alt="User avatar" class="w-full h-full object-cover" @error="handleImgError"/>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14c-3.5 0-6 2.5-6 5.5v.5h12v-.5c0-3-2.5-5.5-6-5.5zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>

          <div v-if="showCard" :class="[isDark ? 'bg-gray-800' : 'bg-white','absolute right-0 top-full w-64 rounded-2xl shadow-2xl p-4 z-10']">
            <div class="w-full text-center px-3 py-2 text-xl border-b mb-1 select-none ">{{ userName || 'Guest'}}</div>
            <router-link v-if="role !== 'admin'" to="/auth/information" :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200','block w-full text-center px-3 py-2 hover:text-amber-500 rounded-xl select-none']">Personal Information</router-link>
            <router-link v-if="role === 'provider'" to="/auth/providerInfo" :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200','block w-full text-center px-3 py-2 hover:text-amber-500 rounded-xl select-none']">Provider Information</router-link>
            <router-link v-if="role !== 'admin'" to="/order" :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200','block w-full text-center px-3 py-2 hover:text-amber-500 rounded-xl select-none']">My Order</router-link>
            <router-link v-if="role === 'provider'" to="/myTask" :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200','block w-full text-center px-3 py-2 hover:text-amber-500 rounded-xl select-none']">My Task</router-link>
            <router-link v-if="role !== 'admin'" to="/chat" :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200','block w-full text-center px-3 py-2 hover:text-amber-500 rounded-xl select-none']">Chat</router-link>

            <button @click="handleLogout"  :class="[isDark ? 'border border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-white' : 'border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white', 'w-full text-center px-4 py-2 mt-4 rounded-lg font-semibold transition-colors select-none']">Logout</button>
          </div>
        </div>
      </template>
      <template v-else>
        <router-link to="/auth/login" :class="[isDark? 'bg-amber-500 hover:bg-amber-600 text-white': 'bg-amber-400 hover:bg-amber-500 text-white','px-4 py-2 rounded-lg']">
          Login / Register
        </router-link>
      </template>


      <button @click="theme.toggle" :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200','ml-4 p-2 rounded-full border select-none transition']">
        {{ isDark ? '🌙' : '☀️' }}
      </button>
    </nav>
  </header>
</template>

<style scoped>

</style>