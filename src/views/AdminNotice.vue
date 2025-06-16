<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { fetchNotices, createNotice } from '@/api/withTokenAPI'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { useAdminStore } from '@/stores/adminStore.ts'
import type { Notice } from '@/types/types.ts'
import router from '@/router'

const theme = useThemeStore()
const adminStore = useAdminStore()
const { isDark } = storeToRefs(theme)
const {isLoggedIn} = storeToRefs(adminStore)

const noticeForm = ref<Omit<Notice, 'NoticeId' | 'sentTime'>>({
  type: 'all',
  title: '',
  content: ''
})

const notices = ref<Notice[]>([])
const loadingNotice = ref<boolean>(false)
const sending = ref<boolean>(false)
const sendResult = ref<string>('')

const loadNotices = async () => {
  loadingNotice.value = true
  try {
    notices.value = await fetchNotices() as Notice[]
    console.log(notices.value)
  } finally {
    loadingNotice.value = false
  }
}

const handleSendNotice = async () => {
  if (!noticeForm.value.title || !noticeForm.value.content) {
    sendResult.value = 'Title and content cannot be empty'
    return
  }
  sending.value = true
  try {
    await createNotice(noticeForm.value, new Date())
    sendResult.value = 'Send successfully'
    noticeForm.value.title = ''
    noticeForm.value.content = ''
    await loadNotices()
  } catch {
    sendResult.value = 'Send Failure'
  } finally {
    sending.value = false
  }
  setTimeout(
  () => {
    sendResult.value = ''
  },1000)
}

onMounted(() => {
  if (!isLoggedIn.value) {
    router.replace('/')
  }
  loadNotices()
})

const { inputClass, buttonClass, noPlaceholderInputClass } = useFormClasses()
</script>

<template>
  <main class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-4xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
      <h1 class="text-center text-2xl font-bold mb-6">Send Notice</h1>
      <form class="mb-8 flex flex-col gap-4" @submit.prevent="handleSendNotice">
        <div class="flex gap-4">
          <select v-model="noticeForm.type" :class="[noPlaceholderInputClass(noticeForm.type)]">
            <option value="all">All Users</option>
            <option value="provider">Only Provider</option>
          </select>
          <input v-model="noticeForm.title" type="text" placeholder="Title" :class="[inputClass]"/>
        </div>
        <textarea v-model="noticeForm.content" placeholder="Content" :class="[inputClass]"></textarea>
        <button type="submit" :disabled="sending" :class="[buttonClass]">{{sending ? 'Sending...' : 'Send Notice'}}</button>
        <div v-if="sendResult" class="text-center text-sm text-green-600">{{sendResult}}</div>
      </form>
      <div v-if="loadingNotice" class="text-center text-gray-400">Loading...</div>
      <div v-else>
        <div v-if="notices.length === 0" class="text-center text-gray-400">No Notice</div>
        <ul v-else :class="[isDark ? 'divide-gray-700' : 'divide-gray-200', 'divide-y']">
          <li v-for="item in notices" :key="item.NoticeId" class="py-3">
            <div class="flex justify-between items-center">
              <span class="font-bold">{{item.title}}</span>
              <span class="text-xs text-gray-400">{{item.targets === 'ALL' ? 'All Users' : 'Only Provider'}}</span>
            </div>
            <div class="flex justify-between items-center">
              <div :class="isDark ? 'text-gray-200' : 'text-gray-700'">{{item.content}}</div>
              <span class="text-xs text-gray-400 whitespace-nowrap">{{new Date(item.sentTime).toUTCString()}}</span>
            </div>

          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
