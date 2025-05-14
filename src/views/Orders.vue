<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useOrderStore } from '@/stores/orderStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'

const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const userStore = useUserStore()
const { userId: userId } = storeToRefs(userStore)

const statusFilter = ref<'All' | string>('All')

// 模拟加载
onMounted(() => {
  if (userId.value) {
    orderStore.fetchOrders(userId.value)
  }
})

// 筛选后的订单
const filteredOrders = computed(() => {
  if (statusFilter.value === 'All') return orders.value
  return orders.value.filter(order => order.status === statusFilter.value)
})

const statusOptions = [
  { value: 'All', label: '全部' },
  { value: 'pending', label: '待确认' },
  { value: 'confirmed', label: '已确认' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' }
]

function statusColor(status: string) {
  switch (status) {
    case 'pending':
      return 'text-yellow-500'
    case 'confirmed':
      return 'text-blue-500'
    case 'completed':
      return 'text-green-600'
    case 'cancelled':
      return 'text-red-500'
    default:
      return ''
  }
}

/* css utils */
const { buttonClass } = useFormClasses()
</script>

<template>
  <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">
    <div
      :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-7xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">
      <h1 class="text-center text-2xl font-bold mb-6">My Order</h1>

      <!-- 筛选栏：状态单选 -->
      <div class="flex flex-col md:flex-row gap-4 items-start md:items-center mb-5">
        <label class="font-medium">筛选状态:</label>
        <div class="flex flex-wrap gap-4">
          <label v-for="option in statusOptions" :key="option.value" class="flex items-center space-x-2">
            <input
              v-model="statusFilter"
              :value="option.value"
              class="form-radio text-blue-600"
              name="status"
              type="radio"
            />
            <span>{{ option.label }}</span>
          </label>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="orderStore.loading">Loading...</div>
      <div v-else-if="filteredOrders.length === 0" class="text-gray-500">暂无订单</div>

      <!-- 订单列表 -->
      <div v-for="order in filteredOrders"
           :key="order.orderId"
           :class="[isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', 'mb-2 relative p-6 rounded-2xl shadow-md transition duration-300 hover:shadow-xl']">

        <div>
          <h3 class="text-lg font-semibold">{{ order.providerName }}</h3>
          <p>服务项目：{{ order.service }}</p>
          <p>预约时间：{{ new Date(order.appointmentDate).toLocaleString() }}</p>
          <p>地址：{{ order.address }}</p>
          <p>状态：<span :class="statusColor(order.status)">{{ order.status }}</span></p>
          <p v-if="order.note">备注：{{ order.note }}</p>
        </div>

        <!-- 绝对定位到卡片右下角 -->
        <div class="absolute bottom-4 right-4 flex space-x-2">
          <button :class="[buttonClass, 'w-24 h-10 text-sm flex items-center justify-center bg-gray-500']"
                  @click="handleOrderAction(order)">查看
          </button>
          <button :class="[buttonClass, 'w-24 h-10 text-sm flex items-center justify-center']"
                  @click="handleOrderAction(order)">取消
          </button>
        </div>
      </div>

    </div>
  </main>


</template>


<style></style>
