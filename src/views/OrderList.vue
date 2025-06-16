<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

import { useThemeStore } from '@/stores/themeStore.ts'
import { useMyOrderStore } from '@/stores/myOrderStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { getConversation } from '@/api/withTokenAPI.ts'

import ReviewModal from '@/components/ReviewModal.vue'

const orderStore = useMyOrderStore()
const theme = useThemeStore()
const userStore = useUserStore()

const { orderCards } = storeToRefs(orderStore)
const { isDark } = storeToRefs(theme)
const { userId,isLoggedIn } = storeToRefs(userStore)

const statusFilter = ref<'All' | string>('All')
const showReviewModal = ref(false)
const selectedOrderId = ref<number>(-1)

// 模拟加载
onMounted(() => {
    orderStore.fetchOrders()
  if (!isLoggedIn.value) {
    router.replace('/')
  }
})

// 筛选后的订单
const filteredOrders = computed(() => {
  if (statusFilter.value === 'All') return orderCards.value
  return orderCards.value.filter(order => order.status === statusFilter.value)
})

const statusOptions = [
  { value: 'All', label: 'All' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'CONFIRMED', label: 'CONFIRMED' },
  { value: 'COMPLETED', label: 'COMPLETED' },
  { value: 'CANCELLED', label: 'CANCELLED' },
]

const statusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-500'
    case 'CONFIRMED':
      return 'text-blue-500'
    case 'COMPLETED':
      return 'text-green-600'
    case 'CANCELLED':
      return 'text-rose-500'
    default:
      return ''
  }
}

import { useModal } from '@/utils/useModal'
const { alert, confirm } = useModal()

//conceal order
const concealOrder = async (orderId: number) => {
  if (await confirm('Are you sure?')) {
    try {
      await orderStore.conceal(orderId)
    } catch (error: any) {
      await alert(error.message || 'Conceal failed, please check your credentials')
    }
  }
}


// 开启评论框
const reviewProvider = (orderId: number) => {
  selectedOrderId.value = orderId
  showReviewModal.value = true
}

//提交评论
const submitReview = async ({ orderId, text, rating }: { orderId: number, text: string, rating: number }) => {
  try {
    await orderStore.review(orderId, text, rating)
    showReviewModal.value = false
    selectedOrderId.value = -1
  } catch (error: any) {
    await alert(error.message || 'Review failed, please check your credentials')
  }
}

const contactProvider = async (providerId: number) => {
  try {
    const { data } = await getConversation(userId.value!, providerId)
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
      <h1 class="text-center text-4xl font-extrabold mb-10 tracking-wide border-b pb-4 border-gray-300">My Orders</h1>

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
      <div v-if="orderStore.loading" class="text-center text-gray-500 text-lg">Loading...</div>
      <div v-else-if="filteredOrders.length === 0" class="text-center text-gray-500 text-lg">No Orders</div>

      <!-- 订单列表 -->
      <div class="space-y-6">
        <div
          v-for="order in filteredOrders"
          :key="order.orderId"
          :class="[isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', 'relative p-6 rounded-2xl shadow-md transition duration-300 hover:shadow-xl']"
        >
          <!-- 价格标签 -->
          <div :class="[isDark ? 'bg-amber-500' : 'bg-amber-400', 'absolute top-6 right-6 text-white text-lg h-10 px-4 flex items-center justify-center rounded-full shadow']">
            {{ order.budget }}€
          </div>

          <!-- 信息网格 -->
          <div class="grid grid-cols-2 gap-y-2 gap-x-6 mb-4">
            <h3 class="text-xl font-semibold col-span-2">{{ order.title }}</h3>
            <p><span class="font-semibold">Provider:</span> {{ order.providerName }}</p>
            <p><span class="font-semibold">Category:</span> {{ order.category }}</p>
            <p v-if="order.frequency === 'Once'"><span class="font-semibold">Date:</span> {{ new Date(order.startTime).toLocaleDateString() }} </p>
            <p v-if="order.frequency !== 'Once'"><span class="font-semibold">Start Date:</span> {{ new Date(order.startTime).toLocaleDateString() }} </p>
            <p v-if="order.frequency !== 'Once'"><span class="font-semibold">End Date:</span> {{ new Date(order.endTime).toLocaleDateString() }} </p>
            <p><span class="font-semibold">Address:</span> {{ order.address }}</p>
            <p><span class="font-semibold">Status:</span> <span :class="statusColor(order.status)">{{ order.status }}</span></p>
          </div>

          <!-- 按钮组 -->
          <div class="flex justify-end items-center gap-3 mt-4">
            <button :class="[buttonClass, 'w-32']" @click="router.push({name:'orderDetail', params:{orderId : order.orderId}})">
              View
            </button>
            <button v-if="order.status === 'PENDING'" :class="[buttonClass, isDark ? 'bg-rose-500 hover:bg-rose-600' : 'bg-rose-400 hover:bg-rose-500', 'w-32']" @click="concealOrder(order.orderId)">
              Cancel
            </button>
            <button v-if="order.status === 'CONFIRMED'" :class="[buttonClass, isDark ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-400 hover:bg-emerald-500', 'w-32']" @click="contactProvider(order.providerId)">
              Contact
            </button>
            <button v-if="order.status === 'CONFIRMED'" :class="[buttonClass, isDark ? 'bg-sky-500 hover:bg-sky-600' : 'bg-sky-400 hover:bg-sky-500', 'w-32']" @click="confirmOrder(order.orderId)">
              Completed
            </button>
            <button v-if="order.status === 'COMPLETED'" :class="[buttonClass, isDark ? 'bg-sky-500 hover:bg-sky-600' : 'bg-sky-400 hover:bg-sky-500', 'w-32']" @click="reviewProvider(order.orderId)">
              Review
            </button>
          </div>

        </div>
      </div>

    </div>
  </main>

  <ReviewModal
      :showReviewModal="showReviewModal"
      :selectedOrderId="selectedOrderId"
      @close="showReviewModal = false"
      @submitReview="submitReview"
  />

</template>


<style></style>
