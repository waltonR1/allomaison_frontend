<script lang="ts" setup>
import { computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useMyTaskStore } from '@/stores/myTaskStore.ts'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { getConversation } from '@/api/withTokenAPI.ts'

// stores & helpers
const myTaskStore = useMyTaskStore()
const userStore = useUserStore()
const themeStore = useThemeStore()

const { isDark } = storeToRefs(themeStore)
const { userId, isLoggedIn } = storeToRefs(userStore)

// router params
const route = useRoute()
const router = useRouter()
const taskId = Number(route.params.taskId)

// 获取当前 Task
const task = computed(() => myTaskStore.getById(taskId))



//加载数据（若尚未加载)
onMounted(() => {
  if (userId.value) {
    myTaskStore.fetchTasks(userId.value)
  }
  if (!isLoggedIn.value) {
    router.replace('/')
  }
})

//conceal task
const concealTask = async (taskId: number) => {
  if (confirm('Are you sure?')) {
    try {
      await myTaskStore.conceal(taskId)
    } catch (error: any) {
      alert(error.message || 'Conceal failed, please check your credentials')
    }
  }
}

//contact with customer
const contactCustomer = async (customerId: number) => {
  try {
    const { data } = await getConversation(userId.value!, customerId)
    await router.push({
      name: 'chat',
      query: { chatId: data.conversationId },
    })
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed')
  }
}


// css utils
const { buttonClass } = useFormClasses()

// 监听：无此 Task 时返回首页
watchEffect(() => {
  if (myTaskStore.fetched && !task.value && !myTaskStore.loading) router.replace('/myTask')
})

</script>

<template>
  <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">

    <div v-if="task" :class="[isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900','w-full max-w-4xl mx-auto p-8 rounded-3xl shadow-lg transition-colors duration-500']">

      <RouterLink to="/myTask" class="mb-6 inline-flex items-center gap-2 text-sm hover:underline">← Back</RouterLink>

      <div class="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <div class="flex-1">
          <h1 class="text-3xl font-extrabold mb-1">{{ task.title }}</h1>
          <p class="text-sm opacity-80">{{ task.city }} • {{ task.category }}</p>
        </div>
        <span class="inline-block bg-amber-400 text-white text-xl sm:text-2xl px-5 py-1.5 rounded-full shadow">{{ task.budget }}€</span>
      </div>

      <p class="leading-relaxed mb-8">{{ task.description }}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div v-if="task.frequency === 'OneTime'">
          <p class="font-semibold mb-1">Date</p>
          <p>{{ new Date(task.startTime).toLocaleDateString() }}</p>
        </div>
        <div v-if="task.frequency !== 'OneTime'">
          <p class="font-semibold mb-1">Start Date</p>
          <p>{{ new Date(task.startTime).toLocaleDateString() }}</p>
        </div>
        <div v-if="task.frequency !== 'OneTime'">
          <p class="font-semibold mb-1">End Date</p>
          <p>{{ new Date(task.endTime).toLocaleDateString() }}</p>
        </div>
        <div>
          <p class="font-semibold mb-1">Address</p>
          <p>{{ task.address }}</p>
        </div>
        <div>
          <p class="font-semibold mb-1">Contact</p>
          <p>{{ task.customerContact }}</p>
        </div>
        <div>
          <p class="font-semibold mb-1">Frequency</p>
          <p>{{ task.frequency }}</p>
        </div>
      </div>

      <section :class="[isDark ? 'text-gray-400' : 'text-gray-600']" class="mb-10 text-sm">
        <div class="flex items-center gap-2 mb-2">
          <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
          <span>ID Verified</span>
        </div>
        <p class="mb-0.5"><strong>Cancellation:</strong> Free up to 24h before appointment</p>
        <p><strong>Guarantee:</strong> 100% satisfaction or free re‑cleaning within 48h</p>
      </section>

      <div class="flex justify-end items-center gap-3 mt-4">
        <button v-if="task.status === 'Confirmed'" :class="[buttonClass, isDark ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-400 hover:bg-emerald-500', 'w-32']" @click="contactCustomer(task.customerId)">
          Contact
        </button>
        <button v-if="task.status === 'Confirmed'" :class="[buttonClass, isDark ? 'bg-rose-500 hover:bg-rose-600' : 'bg-rose-400 hover:bg-rose-500', 'w-32']" @click="concealTask(task.taskId)">
          Cancel
        </button>
      </div>
    </div>
  </main>
</template>


<style scoped>
</style>