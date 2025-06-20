<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

import { useThemeStore } from '@/stores/themeStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import type { loginForm } from '@/types/types'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
const userStore = useUserStore()

const loading = ref(false)

const form: loginForm = reactive({
  email: '',
  password: ''
})

import { useModal } from '@/utils/useModal'
const { alert } = useModal()
const submit = async () => {
  try {
    loading.value = true
    await userStore.login(form)
    await alert('Login successful!')
    await router.push('/')
  } catch (error: any) {
    await alert(error.message || 'Login failed, please check your credentials')
  } finally {
    loading.value = false
  }
}


const { isLoggedIn } = storeToRefs(userStore)
onMounted(() => {
  if (isLoggedIn.value) {
    router.replace('/')
  }
})

const { inputClass, buttonClass } = useFormClasses()

</script>

<template>
    <main class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div :class="[isDark ? 'bg-gray-800' :'bg-white','w-full max-w-md space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Login</h1>

        <form @submit.prevent="submit" class="space-y-6">
          <input v-model="form.email" type="email"  :class="inputClass" placeholder="Email" required />
          <input v-model="form.password" type="password" :class="inputClass" placeholder="Password" required minlength="6" />
          <button type="submit" :class="[buttonClass,'w-full']" :disabled="loading" >Login</button>
        </form>

        <router-link to="/auth/register" class="block text-sm text-center mt-4 hover:underline">
          Don’t have an account? Register
        </router-link>
      </div>
    </main>
</template>

<style scoped>
</style>