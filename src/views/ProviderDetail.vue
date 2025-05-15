<script lang="ts" setup>
import { computed, ref, watch, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import axios from 'axios'

import { useProvidersStore } from '@/stores/providerStore.ts'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { urls } from '@/utils/urls.ts'

// stores & helpers
const providersStore = useProvidersStore()
const userStore = useUserStore()
const themeStore = useThemeStore()

const { isDark } = storeToRefs(themeStore)
const { isLoggedIn } = storeToRefs(userStore)

// router params
const route = useRoute()
const router = useRouter()
const providerId = Number(route.params.providerId)

// 获取当前 Provider
const provider = computed(() => providersStore.getById(providerId))

//加载数据（若尚未加载)
onMounted(() => providersStore.fetchProviders())


//头像显示失败回退
const showImage = ref(true)
const handleImgError = () => (showImage.value = false)

// Connect 按钮逻辑
const submit = async () => {
  if (!isLoggedIn.value) {
    await router.push('/auth/login')
    return
  }
  try {
    await axios.post(
      urls.connectProvider,
      { providerId: providerId },          // 视后端而定
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
    )
    alert('Successfully, Please wait for approval.')
    await router.push('/')
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed')
  }
}

// css utils
const { buttonClass } = useFormClasses()

// 监听：无此 Provider 时返回首页
watchEffect(() => {
  if (providersStore.fetched && !provider.value && !providersStore.loading) router.replace('/providers')
})

// 头像地址变化时重置显示开关
watch(() => provider.value?.avatarUrl, () => (showImage.value = true))
</script>


<template>
  <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">

      <router-link class="mb-6 flex items-center gap-2 hover:underline" to="/providers">← Back</router-link>

      <div class="flex items-center gap-8 mb-6">
        <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-yellow-400 shadow-md">
          <img v-if="showImage && provider?.avatarUrl" :src="provider?.avatarUrl" alt="User avatar" class="w-full h-full object-cover" @error="handleImgError" />
          <svg v-else class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14c-3.5 0-6 2.5-6 5.5v.5h12v-.5c0-3-2.5-5.5-6-5.5zm0-2a4 4 0 100-8 4 4 0 000 8z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
          </svg>
        </div>
        <div>
          <h1 :class="[isDark ? 'text-white' : 'text-gray-900', 'text-3xl font-bold mb-1']">{{ provider?.provider }}</h1>
          <p :class="[isDark ? 'text-gray-400' : 'text-gray-500', 'text-sm']">{{ provider?.city }} • {{ provider?.category }}</p>
          <p class="text-yellow-500 font-semibold">★ {{ provider?.rating }}/5</p>
        </div>
      </div>

      <!--技能标签-->
      <div class="flex flex-wrap gap-2 mb-4">
        <span v-for="(providerLabel, i) in provider?.providerLabels" :key="i" class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{{ providerLabel }}</span>
      </div>

      <!-- 描述 -->
      <p :class="[isDark ? 'text-gray-300' : 'text-gray-700', 'leading-relaxed mb-4']">{{ provider?.description }}</p>
      <p :class="[isDark ? 'text-gray-300' : 'text-gray-700', 'text-xl mb-2']"><strong>Rate:</strong>{{ provider?.priceRange }}</p>

      <!-- 服务明细 -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Services Offered</h2>
        <ul :class="[isDark ? 'text-gray-300' : 'text-gray-600']" class="list-disc list-inside space-y-1">
          <li v-for="(item, i) in provider?.servicesOffered" :key="i">{{ item }}</li>
        </ul>
      </div>

      <!-- 服务区域和时间 -->
      <div :class="[isDark ? 'text-gray-400' : 'text-gray-600']" class="mb-6 text-sm space-y-1">
        <p><strong>Service Area:</strong> {{ provider?.serviceArea }}</p>
        <p><strong>Availability:</strong> {{ provider?.availabilityTime }}</p>
      </div>

      <!-- 客户评论 -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Customer Reviews</h2>
        <div class="space-y-3">
          <div v-for="(review, i) in provider?.customerReview" :key="i" :class="[isDark ? 'bg-gray-700' : 'bg-gray-50', 'p-4 rounded-xl shadow-sm']">
            <p :class="[isDark ? 'text-gray-300' : 'text-gray-700']" class="italic">"{{ review.content }}"</p>
            <p :class="[isDark ? 'text-gray-400' : 'text-gray-500']" class="text-right text-xs">– {{ review.author }}</p>
          </div>
        </div>
      </div>

      <!-- 认证和保障 -->
      <div :class="[isDark ? 'text-gray-400' : 'text-gray-600']" class="mb-6 text-sm">
        <div class="flex items-center gap-2 mb-1">
          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
          <span>ID Verified</span>
        </div>
        <p><strong>Cancellation Policy:</strong> Free up to 24h before appointment</p>
        <p><strong>Service Guarantee:</strong> 100% satisfaction or free re-cleaning within 48h</p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-wrap gap-4 mt-6">
        <button :class="[buttonClass, 'w-full']" @click="submit">Contact</button>
      </div>
    </div>
  </main>
</template>


<style scoped>
</style>