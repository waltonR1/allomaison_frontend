<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useUserStore }  from '@/stores/userStore.ts'
import { useThemeStore } from '@/stores/themeStore.ts'
import { fetchConversations } from '@/api/withTokenAPI.ts'

import ChatMessages from '@/components/ChatMessages.vue'

export interface Conversation {
  id: number
  title: string      // 对话标题，可是联系人昵称或群名
  lastMessage: string
  updatedAt: string
}

// stores ------------------------------------------------
const userStore = useUserStore()
const { userId } = storeToRefs(userStore)

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

// state -------------------------------------------------
const conversations = ref<Conversation[]>([])
const activeChatId   = ref<number | null>(null)

// methods ----------------------------------------------
async function loadConversations() {
  try {
    const resp = await fetchConversations()
    conversations.value = resp.data
    if (!activeChatId.value && resp.data.length) {
      activeChatId.value = resp.data[0].id // 默认选中第一条
    }
  } catch (err) {
    console.error('加载会话列表失败', err)
  }
}

function selectConversation(id: number) {
  activeChatId.value = id
}

// life cycle -------------------------------------------
onMounted(loadConversations)
</script>

<template>
  <section class="flex h-[calc(100vh-6rem)]">
    <!-- 左侧：会话列表 -->
    <aside
        class="w-72 border-r overflow-y-auto"
        :class="isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'"
    >
      <header class="px-4 py-3 text-lg font-semibold border-b"
              :class="isDark ? 'border-gray-700 text-gray-100' : 'border-gray-200 text-gray-800'">
        Messages
      </header>

      <ul class="divide-y" :class="isDark ? 'divide-gray-700' : 'divide-gray-200'">
        <li
            v-for="conv in conversations"
            :key="conv.id"
            @click="selectConversation(conv.id)"
            class="cursor-pointer px-4 py-3 transition-colors"
            :class="[
            activeChatId === conv.id
              ? (isDark ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800')
              : (isDark ? 'hover:bg-gray-700 text-gray-100' : 'hover:bg-gray-50 text-gray-800')
          ]"
        >
          <p class="font-medium truncate">{{ conv.title }}</p>
          <p class="text-xs truncate opacity-70 mt-1">{{ conv.lastMessage }}</p>
          <span class="block text-[10px] text-right opacity-50 mt-1">{{ new Date(conv.updatedAt).toLocaleDateString() }}</span>
        </li>
      </ul>
    </aside>

    <!-- 右侧：聊天消息框 -->
    <main class="flex-1">
      <ChatMessages v-if="activeChatId" :chat-id="activeChatId" />
      <div v-else class="h-full flex items-center justify-center text-gray-400">
        请选择一个会话开始聊天
      </div>
    </main>
  </section>
</template>