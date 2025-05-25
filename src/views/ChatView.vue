<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useRoute} from 'vue-router'
import router from '@/router'

import ChatMessages from '@/components/ChatMessages.vue'

import {useUserStore} from '@/stores/userStore.ts'
import {useThemeStore} from '@/stores/themeStore.ts'
import {fetchConversations} from '@/api/withTokenAPI.ts'
import type {Conversation} from "@/types/types.ts";


// stores ------------------------------------------------
const userStore = useUserStore()
const { userId, isLoggedIn } = storeToRefs(userStore)

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const route = useRoute()

// state -------------------------------------------------
const conversations = ref<Conversation[]>([])
const activeChatId   = ref<number | null>(null)

// methods ----------------------------------------------
const loadConversations = async () => {
  try {
    conversations.value = await fetchConversations(userId.value!)

    const target = Number(route.query.chatId)
    if (target) activeChatId.value = target

  } catch (e) {
    console.error('Loading Chat Failed', e)
  }
}

const selectConversation = (conversationId: number) => {
  activeChatId.value = Number(conversationId)
}

// life cycle -------------------------------------------
onMounted( () => {
  loadConversations()
  if (!isLoggedIn.value) {
    router.replace('/')
  }

})
</script>

<template>
  <section class="flex h-[85vh]">
    <!-- 左侧：会话列表 -->
    <aside class="w-72 border-r overflow-y-auto" :class="isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'">
      <header class="px-4 py-3 text-lg font-semibold border-b" :class="isDark ? 'border-gray-700 text-gray-100' : 'border-gray-200 text-gray-800'">
        Messages
      </header>

      <ul class="divide-y" :class="isDark ? 'divide-gray-700' : 'divide-gray-200'">
        <li v-for="conv in conversations" :key="conv.chatId" @click="selectConversation(conv.chatId)" class="cursor-pointer px-4 py-3 transition-colors" :class="[Number(activeChatId) === Number(conv.chatId)? (isDark ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'): (isDark ? 'hover:bg-gray-700 text-gray-100' : 'hover:bg-gray-50 text-gray-800')]">
          <p class="font-medium truncate">{{ conv.ContactName }}</p>
          <p class="text-xs truncate opacity-70 mt-1">{{ conv.lastMessage }}</p>
          <span class="block text-[10px] text-right opacity-50 mt-1">{{ new Date(conv.updatedAt).toLocaleDateString() }}</span>
        </li>
      </ul>
    </aside>

    <!-- 右侧：聊天消息框 -->
    <main class="flex-1">
      <ChatMessages v-if="activeChatId" :activeChatId=activeChatId />
      <div v-else class="h-full flex items-center justify-center text-gray-400">
        Please choose an conversation.
      </div>
    </main>
  </section>
</template>

<style scoped>

</style>