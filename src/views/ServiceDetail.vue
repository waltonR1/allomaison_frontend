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
  // 非空断言 `!`：告诉 TS 这里必有值
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
    await axios.post(urls.connectService, {}, {
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

// 如果直链 id 无效 → 返回首页（或 404）
watchEffect(() => {
  if (!service.value) router.replace('/')
})
</script>

<template>
    <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <article :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">

        <button class="mb-6 flex items-center gap-2 hover:underline" @click="router.back()">
          ← Back
        </button>

        <h1 class="text-3xl font-bold mb-2">{{ service.provider }}</h1>
        <p :class="[isDark ? 'text-gray-400' : 'text-gray-500', 'mb-6']">
          {{ service.city }} • {{ service.category }}
        </p>

        <p class="text-yellow-500 font-semibold mb-6">
          ★ {{ service.rating }}/5
        </p>

        <p class="leading-relaxed">
          {{ service.description }}
        </p>

        <button @click="submit" :class="[buttonClass,'mt-6']"> Connect </button>
      </article>
    </main>
</template>



<style scoped>

</style>