<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'

import { useModal } from '@/utils/useModal'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { useAdminStore } from '@/stores/adminStore.ts'
import type { AdminAccountForm } from '@/types/types.ts'

const theme = useThemeStore()
const adminStore = useAdminStore()
const { isDark } = storeToRefs(theme)
const { isLoggedIn } = storeToRefs(adminStore)
const { alert } = useModal()

const loading = ref(false)
const errorMsg = ref('')

const form: AdminAccountForm = reactive({
  adminName: '',
  password: ''
})

const submit = async () => {
  errorMsg.value = ''
  try {
    loading.value = true
    await adminStore.adminLogin(form)
    await alert('Admin Login successful!')
    await router.push('/admin')
  } catch (error: any) {
    errorMsg.value = error.message || 'Login failed, please check your credentials'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (isLoggedIn.value) {
    router.replace('/admin')
  }
})

const { inputClass, buttonClass } = useFormClasses()
</script>

<template>
  <main class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-md space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
      <h1 class="text-center text-2xl font-bold mb-6">Admin Login</h1>
      <form @submit.prevent="submit" class="space-y-6">
        <input v-model="form.adminName" type="text" :class="inputClass" placeholder="Admin Name" required />
        <input v-model="form.password" type="password" :class="inputClass" placeholder="Password" required minlength="6" />
        <button type="submit" :class="[buttonClass,'w-full']" :disabled="loading">Login</button>
      </form>
      <div v-if="errorMsg" class="text-red-500 text-center mt-2">{{ errorMsg }}</div>
    </div>
  </main>
</template>

<style scoped>
</style>