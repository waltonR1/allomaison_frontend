<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { fetchInfoMessages, markInfoMessageAsRead } from '@/api/withTokenAPI'
import type { InfoMessage } from '@/types/types'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const userStore = useUserStore()
const { userId, isLoggedIn } = storeToRefs(userStore)

const showPanel = ref(false)
const isClicked = ref(false)
const isHovered = ref(false)

const infoMessages = ref<InfoMessage[]>([])
const loading = ref(false)


enum InfoMessageType {
  NOTICE = 'NOTICE',
  ALERT = 'ALERT',
  SYSTEM = 'SYSTEM',
  AUDIT = 'AUDIT'
}

const loadMessages = async () => {
  loading.value = true
  try {
    if (userId.value) {
      infoMessages.value = await fetchInfoMessages(userId.value)
    }
  } catch (e: any) {
    throw new Error(e)
  } finally {
    loading.value = false
  }
}

const togglePanel = () => {
  isClicked.value = true
  showPanel.value = !showPanel.value
  if (showPanel.value) {
    loadMessages()
  }
  setTimeout(() => {
    isClicked.value = false
  }, 150)
}

// 💡 用 style 而不是 class 来控制 transform，避免 class 优先级冲突  Tailwind 的 hover:scale-* 和 Vue 动态绑定的 class/style 在 同一个 transform 属性上冲突了，且 hover: 优先级更高，会覆盖你点击时想要的 scale 效果
const transformStyle = computed(() => {
  if (isClicked.value) return 'scale(0.9)'
  if (isHovered.value) return 'scale(1.1)'
  return 'scale(1)'
})

const getTypeColor = (type: InfoMessageType) => {
  switch(type) {
    case 'NOTICE': return 'bg-blue-100 text-blue-700 border-blue-300'
    case 'ALERT': return 'bg-red-100 text-red-700 border-red-300'
    case 'SYSTEM': return 'bg-gray-100 text-gray-700 border-gray-300'
    case 'AUDIT': return 'bg-green-100 text-green-700 border-green-300'
    default: return 'bg-gray-100 text-gray-700 border-gray-300'
  }
}

const selectedMessage = ref<InfoMessage|null>(null)

const openDetail = (msg: InfoMessage) => {
  if (!msg.read) {
    msg.read = true;
    markInfoMessageAsRead(msg.announceId).catch(() => { msg.read = false })
  }
  selectedMessage.value = msg;
}

const closeDetail = () => {
  selectedMessage.value = null
}

watch(isLoggedIn, (val) => {
  if (val) {
    loadMessages()
  } else {
    infoMessages.value = []
  }
})

onMounted(() => {
  if (isLoggedIn.value ) {}
  loadMessages()
})
</script>

<template>
  <!-- 悬浮添加按钮 -->
  <button @click="togglePanel" @mouseenter="isHovered = true" @mouseleave="isHovered = false" :class="[isDark ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-400 hover:bg-amber-500', isDark ? 'dark:border dark:border-gray-700' : '', 'fixed bottom-8 right-8 text-white rounded-full w-14 h-14 text-3xl flex items-center justify-center shadow-lg transition-all duration-200 z-50']" :style="{ transform: transformStyle }">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
    </svg>
    <span v-if="infoMessages.filter(m=>!m.read).length" class="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1.5 py-0.5">{{ infoMessages.filter(m=>!m.read).length }}</span>
  </button>

  <!-- 展开的浮动面板 -->
  <Transition name="fade-slide">
    <div v-if="showPanel" class="fixed bottom-28 right-8 w-80 p-4 rounded-xl z-40 transition-all duration-300"
      :class="[
        isDark
          ? 'bg-gray-800 text-white border border-gray-700 shadow-2xl shadow-gray-900/60'
          : 'bg-white text-gray-900 border border-gray-200 shadow-xl shadow-gray-300/40',
      ]"
    >
      <h3 class="text-lg font-semibold mb-2">Notification</h3>
      <div v-if="loading" class="text-gray-400 text-center py-4">Loading...</div>
      <div v-else-if="infoMessages.length === 0" class="text-gray-400 text-center py-4">No notifications</div>
      <ul v-else class="space-y-2 max-h-72 overflow-y-auto">
        <li v-for="msg in infoMessages" :key="msg.announceId">
          <div @click="openDetail(msg)" class="cursor-pointer border rounded-lg px-3 py-2 flex flex-col gap-1 hover:bg-gray-50 transition-all duration-150" :class="getTypeColor(msg.type as InfoMessageType)">
            <div class="flex items-center justify-between">
              <span class="font-medium">{{ msg.title || 'No Title' }}</span>
              <span class="text-xs" :class="msg.read ? 'opacity-60' : 'font-bold text-red-500'">{{ msg.read ? 'Read' : 'Unread' }}</span>
            </div>
            <div class="text-xs text-gray-500">{{ msg.sentTime.slice(0, 16).replace('T', ' ') }}</div>
            <div class="truncate text-sm">{{ msg.content }}</div>
          </div>
        </li>
      </ul>

      <!-- 通知详情弹窗 -->
      <div v-if="selectedMessage" class="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
        <div :class="[isDark ? 'bg-gray-800 text-white border border-gray-700 shadow-2xl shadow-gray-900' : 'bg-white text-gray-900 border border-gray-200 shadow-xl shadow-gray-300', 'rounded-xl shadow-lg p-6 w-96 relative']">
          <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" @click="closeDetail">✕</button>
          <h4 class="text-lg font-semibold mb-2">{{ selectedMessage.title || 'No Title' }}</h4>
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ selectedMessage.sentTime.slice(0, 16).replace('T', ' ') }}</div>
          <div class="mb-2"><span class="font-bold">Type: </span>{{ selectedMessage.type }}</div>
          <div class="mb-2"><span class="font-bold">Content: </span>{{ selectedMessage.content }}</div>
        </div>
      </div>
    </div>

    <div style="display: none">
      <span class="fade-slide-enter-active fade-slide-leave-active fade-slide-enter-from fade-slide-enter-to fade-slide-leave-from fade-slide-leave-to"></span>
    </div>
  </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
