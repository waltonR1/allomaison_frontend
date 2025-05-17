<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore }  from '@/stores/userStore.ts'
import { useThemeStore } from '@/stores/themeStore.ts'
import { fetchMessages, postMessage } from '@/api/withTokenAPI.ts'

interface Props {
  activeChatId: number
}
const props = defineProps<Props>()

// stores ------------------------------------------------
const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

// state -------------------------------------------------
export interface Message {
  id: number
  senderId: number
  content: string
  createdAt: string
}

const messages   = ref<Message[]>([])
const newMessage = ref('')

// methods ----------------------------------------------
const loadMessages = async () => {
  try {
    const resp = await fetchMessages(props.activeChatId)
    messages.value = resp.data
  } catch (err) {
    console.error('加载消息失败', err)
  }
}

const sendMessage = async () => {
  const content = newMessage.value.trim()
  if (!content) return

  try {
    const resp = await postMessage(props.activeChatId, userId.value!, content, new Date() )
    messages.value.push(resp.data)
    newMessage.value = ''
  } catch (err) {
    console.error('发送消息失败', err)
  }
}

// life cycle -------------------------------------------
onMounted(loadMessages)

// 当聊天对象改变时重新加载
watch(() => props.activeChatId, loadMessages)
</script>

<template>
  <section class="flex flex-col h-full px-4 py-6 mr-10 border-r-auto border border-amber-400">
    <!-- 消息列表 -->
    <div class="flex-1 overflow-y-auto space-y-4 pr-1">
      <div v-for="msg in messages" :key="msg.id" class="flex w-full" :class="msg.senderId === userId ? 'justify-end' : 'justify-start'">
      <div class="max-w-[70%] p-3 rounded-2xl shadow transition-colors duration-300" :class="[msg.senderId === userId? (isDark ? 'bg-amber-600 text-white' : 'bg-amber-500 text-white'): (isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800')]">
        <p class="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {{ msg.content }}
        </p>
        <span class="block text-xs text-right opacity-60 mt-1">
        {{ new Date(msg.createdAt).toLocaleTimeString() }}
      </span>
      </div>
    </div>
    </div>

    <!-- 输入框 -->
    <div class="mt-4 flex items-center">
      <input v-model="newMessage" type="text" placeholder="Type your message..." :class="[isDark? 'bg-gray-800 text-gray-100 placeholder-gray-400': 'bg-gray-100 text-gray-800 placeholder-gray-500','h-24 flex-1 px-4 py-2 rounded-l-4xl focus:outline-none transition']" />
      <button @click="sendMessage" :class="[isDark ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600','h-24 px-6 py-2 rounded-r-4xl text-white font-medium transition-colors duration-300 focus:outline-none']">
        Send
      </button>
    </div>
  </section>
</template>

<style scoped>

</style>