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
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">

      <button class="mb-6 flex items-center gap-2 hover:underline" @click="router.back()">← Back</button>

      <div class="flex items-center gap-8 mb-6">
        <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-yellow-400 shadow-md">
          <img v-if="service.avatarUrl" :src="service.avatarUrl" alt="User avatar" class="w-full h-full object-cover" />
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14c-3.5 0-6 2.5-6 5.5v.5h12v-.5c0-3-2.5-5.5-6-5.5zm0-2a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-1">{{ service.provider }}</h1>
          <p class="text-sm text-gray-500">{{ service.city }} • {{ service.category }}</p>
          <p class="text-yellow-500 font-semibold">★ {{ service.rating }}/5</p>
        </div>
      </div>

      <!-- 描述 -->
      <p class="leading-relaxed text-gray-700 mb-6">{{ service.description }}</p>

      <!-- 服务明细 -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Services Offered</h2>
        <ul class="list-disc list-inside text-gray-600 space-y-1">
          <li>Kitchen deep cleaning</li>
          <li>Bathroom sanitization</li>
          <li>Dusting and vacuuming</li>
          <li>Window cleaning (interior)</li>
        </ul>
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Eco-Friendly</span>
        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Pet-Friendly</span>
        <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Child Safe</span>
      </div>

      <!-- 服务区域和时间 -->
      <div class="mb-6 text-sm text-gray-600 space-y-1">
        <p><strong>Service Area:</strong> Paris + up to 15km</p>
        <p><strong>Availability:</strong> Mon–Fri: 09:00–18:00, Sat: 10:00–14:00</p>
      </div>

      <!-- 客户评论 -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Customer Reviews</h2>
        <div class="space-y-3">
          <div class="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p class="italic text-gray-700">"Very punctual and professional. My kitchen has never been cleaner!"</p>
            <p class="text-right text-xs text-gray-500">– Marie L., Paris</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p class="italic text-gray-700">"Superb work and very polite. Highly recommended."</p>
            <p class="text-right text-xs text-gray-500">– Ahmed R., Paris</p>
          </div>
        </div>
      </div>

      <!-- 认证和保障 -->
      <div class="mb-6 text-sm text-gray-600">
        <div class="flex items-center gap-2 mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>ID Verified</span>
        </div>
        <p><strong>Cancellation Policy:</strong> Free up to 24h before appointment</p>
        <p><strong>Service Guarantee:</strong> 100% satisfaction or free re-cleaning within 48h</p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-wrap gap-4 mt-6">
        <button @click="submit" :class="[buttonClass, 'transition hover:scale-105']">Connect</button>
      </div>
    </div>
  </main>
</template>


<style scoped>
</style>