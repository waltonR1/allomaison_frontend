<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '@/router'
import { storeToRefs } from 'pinia'

import { createAdminAccount } from '@/api/withTokenAPI'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { useAdminStore } from '@/stores/adminStore.ts'
import type { AdminAccountForm } from '@/types/types.ts'

const adminForm = ref<AdminAccountForm>({
  adminName: '',
  password: ''
})

const creating = ref(false)
const createResult = ref('')

const theme = useThemeStore()
const adminStore = useAdminStore()
const { isDark } = storeToRefs(theme)
const {isLoggedIn} = storeToRefs(adminStore)
const { inputClass, buttonClass } = useFormClasses()

const handleCreateAdmin = async (): Promise<void> => {
  const { adminName, password } = adminForm.value
  if (!adminName || !password) {
    createResult.value = 'Please enter all required fields'
    return
  }
  creating.value = true
  try {
    await createAdminAccount(adminForm.value)
    createResult.value = 'Create successfully'
    adminForm.value = { adminName: '', password: '' }
  } catch {
    createResult.value = 'Create Failed'
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  if (!isLoggedIn.value) {
    router.replace('/')
  }
})
</script>


<template>
  <main class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white','w-full max-w-md space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
      <h1 class="text-center text-2xl font-bold mb-6">Create Admin Account</h1>
      <form class="flex flex-col gap-4" @submit.prevent="handleCreateAdmin">
        <input v-model="adminForm.adminName" type="text" placeholder="Admin Name*" :class="inputClass" />
        <input v-model="adminForm.password" type="password" placeholder="Password*" :class="inputClass" />
        <button type="submit" :disabled="creating" :class="buttonClass">{{creating ? 'Creating...' : 'Create Admin Account'}}</button>
        <div v-if="createResult" class="text-center text-sm text-green-600">{{createResult}}</div>
      </form>
    </div>
  </main>
</template>

<style scoped>
</style>