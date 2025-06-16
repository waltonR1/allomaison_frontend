<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import router from '@/router'

import { useAdminStore } from '@/stores/adminStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'

const theme = useThemeStore()
const adminStore = useAdminStore()
const { isDark } = storeToRefs(theme)
const {isLoggedIn} = storeToRefs(adminStore)
const { buttonClass } = useFormClasses()

onMounted(() => {
  if (!isLoggedIn.value) {
    router.replace('/')
  }
})

</script>

<template>
  <main class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
      <h1 class="text-center text-3xl font-bold mb-6">AlloMaison Administrator Back Office</h1>
      <p class="text-center text-base text-gray-500 mb-8">
        Welcome to the AlloMaison administrator system. Here you can perform actions such as provider review, mass notifications, and administrator account management.<br><br>
        Please click the button below to go to the corresponding function page.
      </p>
      <div class="flex flex-col gap-6">
        <router-link to="/admin/provider" :class="buttonClass">Provider Application</router-link>
        <router-link to="/admin/notice" :class="[buttonClass, isDark ? 'bg-sky-500 hover:bg-sky-600' : 'bg-sky-400 hover:bg-sky-500', 'w-full']">Send Notice</router-link>
        <router-link to="/admin/account" :class="[buttonClass, isDark ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-400 hover:bg-emerald-500', 'w-full']">Admin Manager</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>