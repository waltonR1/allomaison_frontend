<script lang="ts" setup>
import { computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useOrderStore } from '@/stores/orderStore.ts'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'

// stores & helpers
const orderStore = useOrderStore()
const userStore = useUserStore()
const themeStore = useThemeStore()

const { isDark } = storeToRefs(themeStore)
const { isLoggedIn } = storeToRefs(userStore)
const { userId } = storeToRefs(userStore)

// router params
const route = useRoute()
const router = useRouter()
const orderId = Number(route.params.orderId)

// 获取当前 Order
const order = computed(() => orderStore.getById(orderId))

//加载数据（若尚未加载)
onMounted(() => {
  if (userId.value) {
    orderStore.fetchOrders(userId.value)
  }
  if (!isLoggedIn) {
    router.replace('/')
  }
})

// format helpers
function formatDate(iso: string): string {
  if (!iso) return '-'
  const d = new Date(iso)
  return d.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
}

// Conceal Order
const concealOrder = async (orderId: number) => {
  if (confirm('Are you sure?')) {
    try {
      await orderStore.conceal(orderId)
    } catch (error: any) {
      alert(error.message || 'Conceal failed, please check your credentials')
    }
  }
}

//restart order
const restartOrder = async (orderId: number) => {
  if (confirm('Are you sure?')) {
    try {
      await orderStore.restart(orderId)
    } catch (error: any) {
      alert(error.message || 'Conceal failed, please check your credentials')
    }
  }
}

// css utils
const { buttonClass } = useFormClasses()

// 监听：无此 Order 时返回首页
watchEffect(() => {
  if (orderStore.fetched && !order.value && !orderStore.loading) router.replace('/order')
})

</script>

<template>
  <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">

    <div v-if="order" :class="[isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900','w-full max-w-4xl mx-auto p-8 rounded-3xl shadow-lg transition-colors duration-500']">

      <RouterLink to="/order" class="mb-6 inline-flex items-center gap-2 text-sm hover:underline">← Back</RouterLink>

      <div class="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
        <div class="flex-1">
          <h1 class="text-3xl font-extrabold mb-1">{{ order.title }}</h1>
          <p class="text-sm opacity-80">{{ order.city }} • {{ order.category }}</p>
        </div>
        <span class="inline-block bg-amber-400 text-white text-xl sm:text-2xl px-5 py-1.5 rounded-full shadow">{{ order.budget }}€</span>
      </div>

      <p class="leading-relaxed mb-8">{{ order.description }}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <p class="font-semibold mb-1">Date & Time</p>
          <p>{{ formatDate(order.datetime) }}</p>
        </div>
        <div>
          <p class="font-semibold mb-1">Address</p>
          <p>{{ order.address }}</p>
        </div>
        <div>
          <p class="font-semibold mb-1">Frequency</p>
          <p>{{ order.frequency }}</p>
        </div>
        <div>
          <p class="font-semibold mb-1">Status</p>
          <p>{{ order.status }}</p>
        </div>
        <div v-if="order.status === 'Confirmed' || order.status === 'Completed'">
          <p class="font-semibold mb-1">Provider Name</p>
          <p>{{ order.providerName }}</p>
        </div>
        <div v-if="order.status === 'Confirmed' || order.status === 'Completed'">
          <p class="font-semibold mb-1">Contact</p>
          <p>{{ order.providerContact }}</p>
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
        <p class="mb-0.5"><strong>Guarantee:</strong> 100% satisfaction or free re‑cleaning within 48h</p>
        <p><strong>Order ID:</strong> {{order.orderId}}</p>

      </section>

      <div class="flex justify-end items-center gap-3 mt-4">
        <button v-if="order.status === 'Pending'" :class="[buttonClass, isDark ? 'bg-rose-500 hover:bg-rose-600' : 'bg-rose-400 hover:bg-rose-500', 'w-24']" @click="concealOrder(order.orderId)">
          Cancel
        </button>
        <button v-if="order.status === 'Confirmed'" :class="[buttonClass, isDark ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-400 hover:bg-emerald-500', 'w-32']" @click="contactProvider(order.providerId)">
          Contact
        </button>
        <button v-if="order.status === 'Completed'" :class="[buttonClass, isDark ? 'bg-sky-500 hover:bg-sky-600' : 'bg-sky-400 hover:bg-sky-500', 'w-32']" @click="reviewProvider(order.providerId)">
          Review
        </button>
        <button v-if="order.status === 'Cancelled'" :class="[buttonClass, isDark ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-400 hover:bg-gray-500', 'w-32']" @click="restartOrder(order.orderId)">
          Post Again
        </button>
      </div>
    </div>
  </main>
</template>


<style scoped>
</style>