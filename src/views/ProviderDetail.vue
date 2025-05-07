<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { providerCards } from '@/data/serviceCard'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import Router from '@/router'
import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import { useUserStore } from '@/stores/user.ts'

const { buttonClass } = useFormClasses()

const { isDark } = storeToRefs(useThemeStore())

const route  = useRoute()
const router = useRouter()
const id     = Number(route.params.id)

const service = computed(() =>
  providerCards.find(item => item.id === id)!
)

const userStore = useUserStore()
const token = ref(userStore.checkToken())

const submit = async () => {
  if (!token.value) {
    await Router.push('/auth/login')
    return
  }
  try {
    // 发送内容未定
    await axios.post(urls.connectProvider, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'Failed');
  }
  alert('Successfully, Please wait for approval.')
  await Router.push('/')
}

watchEffect(() => {
  if (!service.value) router.replace('/')
})
</script>

<template>
    <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <article :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">

        <button class="mb-6 flex items-center gap-2 hover:underline" @click="router.back()">← Back</button>

        <div class="flex items-center gap-8 mb-6">

          <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-yellow-400 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14c-3.5 0-6 2.5-6 5.5v.5h12v-.5c0-3-2.5-5.5-6-5.5zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>

          <div>
            <h1 class="text-3xl font-bold mb-2">{{ service.provider }}</h1>
            <p :class="[isDark ? 'text-gray-400' : 'text-gray-500']">{{ service.city }} • {{ service.category }}</p>
            <p class="text-yellow-500 font-semibold">★ {{ service.rating }}/5</p>

          </div>
        </div>

        <p class="leading-relaxed">{{ service.description }}</p>

        <button @click="submit" :class="[buttonClass,'mt-6']"> Connect </button>
      </article>
    </main>
</template>

<style scoped>
</style>