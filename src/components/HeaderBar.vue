<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
import Router from '@/router'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

const userStore = useUserStore()
const { role } = storeToRefs(userStore)
const token = ref(userStore.checkToken())

const showLogout = ref(false)

const FindService = () => Router.push('/findServices')
const FindRequest = () => Router.push('/findRequests')
const PostRequest = () => Router.push('/postRequest')
const BecomeProvider = () => Router.push('/becomeProvider')
const LoginRegister = () => Router.push('/auth/login')

const handleLogout = () => {
  userStore.logout()
  Router.push('/')
}

</script>

<template>
  <header :class="[isDark ? 'bg-gray-800' : 'bg-white','px-6 py-4 shadow flex justify-between items-center sticky top-0 z-10 transition duration-500']">

    <h1 :class="[isDark ? 'text-amber-600' : 'text-amber-400','text-3xl font-bold select-none']">
      <router-link to="/">AlloMaison</router-link>
    </h1>

    <nav class="flex items-center space-x-4">
      <button v-if="role === 'provider'" class="hover:text-amber-500 transition select-none" @click="FindRequest">Find Request</button>
      <button class="hover:text-amber-500 transition select-none" @click="FindService">Find Services</button>
      <button class="hover:text-amber-500 transition select-none" @click="PostRequest">Post a Request</button>
      <button v-if="role !== 'provider'" class="hover:text-amber-500 transition select-none" @click="BecomeProvider">Become a Provider</button>

      <template v-if="token">
        <div
          class="relative"
          @mouseenter="showLogout = true"
          @mouseleave="showLogout = false"
        >
          <button :class="[isDark ? 'border border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-white' : 'border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white', 'px-4 py-2 rounded-lg font-semibold transition-colors select-none']">
            Personal Information
          </button>

          <!-- logout dropdown -->
          <transition>
            <div
              v-if="showLogout"
              class="absolute right-0 top-full w-full shadow-lg z-20 rounded-lg overflow-hidden"
            >
              <button @click="handleLogout"  :class="[isDark ? 'border border-amber-400 text-amber-400 hover:bg-amber-500 hover:text-white' : 'border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white', 'w-full text-center px-4 py-2 rounded-lg font-semibold transition-colors select-none']">
                Logout
              </button>
            </div>
          </transition>
        </div>
      </template>
      <template v-else>
        <button @click="LoginRegister" :class="[isDark? 'bg-amber-500 hover:bg-amber-600 text-white': 'bg-amber-400 hover:bg-amber-500 text-white','px-4 py-2 rounded-lg']">
          Login / Register
        </button>
      </template>


      <button @click="theme.toggle" :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200','ml-4 p-2 rounded-full border select-none transition']">
        {{ isDark ? '🌙' : '☀️' }}
      </button>
    </nav>
  </header>
</template>

<style scoped>

</style>