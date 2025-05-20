<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

import { useThemeStore } from '@/stores/themeStore.ts'
import { useMyTaskStore } from '@/stores/myTaskStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { getConversation } from '@/api/withTokenAPI.ts'

const myTaskStore = useMyTaskStore()
const theme = useThemeStore()
const userStore = useUserStore()

const { taskCards } = storeToRefs(myTaskStore)
const { isDark } = storeToRefs(theme)
const { userId,isLoggedIn } = storeToRefs(userStore)

const statusFilter = ref<'All' | string>('All')

// 模拟加载
onMounted(() => {
  if (userId.value) {
    myTaskStore.fetchTasks(userId.value)
  }
  if (!isLoggedIn.value) {
    router.replace('/')
  }
})

// 筛选后的订单
const filteredTasks = computed(() => {
  if (statusFilter.value === 'All') return taskCards.value
  return taskCards.value.filter(task => task.status === statusFilter.value)
})

const statusOptions = [
  { value: 'All', label: 'All' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Cancelled', label: 'Cancelled' },
]

const statusColor = (status: string) => {
  switch (status) {
    case 'Confirmed':
      return 'text-blue-500'
    case 'Completed':
      return 'text-green-600'
    case 'Cancelled':
      return 'text-rose-500'
    default:
      return ''
  }
}

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

//complete task
const completeTask = async (taskId: number) => {
  if (confirm('Are you sure?')) {
    try {
      await myTaskStore.complete(taskId)
    } catch (error: any) {
      alert(error.message || 'Complete failed, please check your credentials')
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


/* css utils */
const { buttonClass } = useFormClasses()
</script>

<template>
  <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-7xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">

      <!-- 标题 -->
      <h1 class="text-center text-4xl font-extrabold mb-10 tracking-wide border-b pb-4 border-gray-300">My Tasks</h1>

      <!-- 筛选区域 -->
      <div class="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6 text-lg">
        <label class="font-semibold">Filter by Status:</label>
        <div class="flex flex-wrap gap-4">
          <label v-for="option in statusOptions" :key="option.value" class="flex items-center space-x-2 cursor-pointer">
            <input v-model="statusFilter" :value="option.value" type="radio" name="status" class="form-radio h-5 w-5 text-amber-500">
            <span>{{ option.label }}</span>
          </label>
        </div>
      </div>

      <!-- 加载与空状态 -->
      <div v-if="myTaskStore.loading" class="text-center text-gray-500 text-lg">Loading...</div>
      <div v-else-if="filteredTasks.length === 0" class="text-center text-gray-500 text-lg">No Tasks</div>

      <!-- 订单列表 -->
      <div class="space-y-6">
        <div
          v-for="task in filteredTasks"
          :key="task.taskId"
          :class="[isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', 'relative p-6 rounded-2xl shadow-md transition duration-300 hover:shadow-xl']"
        >
          <!-- 价格标签 -->
          <div :class="[isDark ? 'bg-amber-500' : 'bg-amber-400', 'absolute top-6 right-6 text-white text-lg h-10 px-4 flex items-center justify-center rounded-full shadow']">
            {{ task.budget }}€
          </div>

          <!-- 信息网格 -->
          <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <h3 class="text-xl font-semibold col-span-2">{{ task.title }}</h3>
            <p><span class="font-semibold">Provider:</span> {{ task.customerName }}</p>
            <p><span class="font-semibold">Category:</span> {{ task.category }}</p>
            <p v-if="task.frequency === 'OneTime'"><span class="font-semibold">Date:</span> {{ new Date(task.startTime).toLocaleDateString() }} </p>
            <p v-if="task.frequency !== 'OneTime'"><span class="font-semibold">Start Date:</span> {{ new Date(task.startTime).toLocaleDateString() }} </p>
            <p v-if="task.frequency !== 'OneTime'"><span class="font-semibold">End Date:</span> {{ new Date(task.endTime).toLocaleDateString() }} </p>
            <p><span class="font-semibold">Address:</span> {{ task.address }}</p>
            <p><span class="font-semibold">Status:</span> <span :class="statusColor(task.status)">{{ task.status }}</span></p>
          </div>

          <!-- 按钮组 -->
          <div class="flex justify-end items-center gap-3 mt-4">
            <button :class="[buttonClass, 'w-32']" @click="router.push({name:'taskInfo', params:{taskId : task.taskId}})">
              View
            </button>
            <button v-if="task.status === 'Confirmed'" :class="[buttonClass, isDark ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-400 hover:bg-emerald-500', 'w-32']" @click="contactCustomer(task.customerId)">
              Contact
            </button>
            <button v-if="task.status === 'Confirmed'" :class="[buttonClass, isDark ? 'bg-sky-500 hover:bg-sky-600' : 'bg-sky-400 hover:bg-sky-500', 'w-32']" @click="completeTask(task.taskId)">
              Completed
            </button>
            <button v-if="task.status === 'Confirmed'" :class="[buttonClass, isDark ? 'bg-rose-500 hover:bg-rose-600' : 'bg-rose-400 hover:bg-rose-500', 'w-32']" @click="concealTask(task.taskId)">
              Cancel
            </button>
          </div>

        </div>
      </div>

    </div>
  </main>

</template>


<style></style>
