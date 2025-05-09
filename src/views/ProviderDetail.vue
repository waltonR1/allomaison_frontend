<script setup lang="ts">
import {computed, ref, watch, watchEffect} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { providerCards } from '@/data/providerCard.ts'
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

const showImage = ref(true)
const handleImgError = () => {
  showImage.value = false
}

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
watch(() => service.value.avatarUrl, () => {
  showImage.value = true
})
</script>

<template>
  <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">

      <button class="mb-6 flex items-center gap-2 hover:underline" @click="router.back()">← Back</button>

      <div class="flex items-center gap-8 mb-6">
        <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-yellow-400 shadow-md">
          <img v-if="showImage && service.avatarUrl" :src="service.avatarUrl" alt="User avatar" class="w-full h-full object-cover" @error="handleImgError"/>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14c-3.5 0-6 2.5-6 5.5v.5h12v-.5c0-3-2.5-5.5-6-5.5zm0-2a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </div>
        <div>
          <h1 :class="[isDark ? 'text-white' : 'text-gray-900', 'text-3xl font-bold mb-1']">{{ service.provider }}</h1>
          <p :class="[isDark ? 'text-gray-400' : 'text-gray-500', 'text-sm']">{{ service.city }} • {{ service.category }}</p>
          <p class="text-yellow-500 font-semibold">★ {{ service.rating }}/5</p>
        </div>
      </div>

      <!--技能标签-->
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="(providerLabel, i) in service.providerLabels" :key="i" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{{ providerLabel }}</span>
      </div>

      <!-- 描述 -->
      <p :class="[isDark ? 'text-gray-300' : 'text-gray-700', 'leading-relaxed mb-4']">{{ service.description }}</p>
      <p :class="[isDark ? 'text-gray-300' : 'text-gray-700', 'text-xl mb-2']"><strong>Rate:</strong> {{ service.priceRange }}</p>

      <!-- 服务明细 -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Services Offered</h2>
        <ul class="list-disc list-inside space-y-1" :class="[isDark ? 'text-gray-300' : 'text-gray-600']">
          <li v-for="(item, i) in service.servicesOffered" :key="i">{{ item }}</li>
        </ul>
      </div>

      <!-- 服务区域和时间 -->
      <div class="mb-6 text-sm space-y-1" :class="[isDark ? 'text-gray-400' : 'text-gray-600']">
        <p><strong>Service Area:</strong> {{ service.serviceArea }}</p>
        <p><strong>Availability:</strong> {{ service.availabilityTime }}</p>
      </div>

      <!-- 客户评论 -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Customer Reviews</h2>
        <div class="space-y-3">
          <div v-for="(review, i) in service.customerReview" :key="i" :class="[isDark ? 'bg-gray-700' : 'bg-gray-50', 'p-4 rounded-xl shadow-sm']">
            <p class="italic" :class="[isDark ? 'text-gray-300' : 'text-gray-700']">"{{ review.content }}"</p>
            <p class="text-right text-xs" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">– {{ review.author }}</p>
          </div>
        </div>
      </div>

      <!-- 认证和保障 -->
      <div class="mb-6 text-sm" :class="[isDark ? 'text-gray-400' : 'text-gray-600']">
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