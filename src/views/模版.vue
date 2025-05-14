<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'
import { ref } from 'vue'

const theme = useThemeStore()

const { isDark } = storeToRefs(theme)


const showPanel = ref(false)

function togglePanel() {
  showPanel.value = !showPanel.value
}

</script>

<template>

    <div class="flex flex-1 items-center justify-center py-12 px-4">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-7xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
      </div>
    </div>


  <!-- 悬浮添加按钮 -->
  <button
    @click="togglePanel"
    class="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full w-14 h-14 text-3xl flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-300 z-50 hover:scale-130 hover:text-4xl"
  >
    <span v-if="!showPanel">+</span>
    <span v-else>-</span>
  </button>

  <!-- 展开的浮动面板 -->
  <div
    v-if="showPanel"
    class="fixed bottom-28 right-8 w-80 bg-white shadow-xl rounded-xl p-4 border border-gray-200 z-40"
    :class="{ 'dark:bg-gray-800 dark:text-white': isDark }"
  >
    <h3 class="text-lg font-semibold mb-2">新订单</h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">这里可以放表单、按钮或链接。</p>
  </div>

</template>

<style scoped>

</style>