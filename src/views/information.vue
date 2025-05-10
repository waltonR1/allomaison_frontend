<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'
import { UserInfo } from '@/data/userInfo.ts';

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

</script>

<template>

  <main class="flex flex-1 items-center justify-center py-12 px-4">
    <div :class="[isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', 'w-full max-w-7xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">

      <!-- 标题 -->
      <h2 class="text-3xl font-bold text-center select-none">Personal Information</h2>

      <!-- 用户卡片 -->
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <div class="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center border-2 border-yellow-400 shadow-md hover:shadow-xl hover:bg-gray-300 hover:scale-110">
          <img v-if="avatarUrl" :src="avatarUrl" alt="User avatar" class="w-full h-full object-cover" />
          <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14c-3.5 0-6 2.5-6 5.5v.5h12v-.5c0-3-2.5-5.5-6-5.5zm0-2a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </div>
        <div class="flex-1 space-y-4">
          <div>
            <p class="text-sm font-semibold text-amber-500">Username</p>
            <p class="text-lg font-medium">{{ user_name || 'Guest' }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-amber-500">Email</p>
            <p class="text-lg font-medium">{{ email || 'not_provided@example.com' }}</p>
          </div>
        </div>
      </div>

      <!-- 编辑按钮 -->
      <div class="flex justify-center">
        <router-link
          to="/auth/edit"
          :class="[isDark ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-amber-400 hover:bg-amber-500 text-white',
                  'px-6 py-2 rounded-xl text-lg font-semibold transition-colors']"
        >
          Edit Profile
        </router-link>
      </div>

    </div>

  </main>

</template>

<style scoped>

</style>