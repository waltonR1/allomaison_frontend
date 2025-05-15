<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const showPanel = ref(false)
const isClicked = ref(false)
const isHovered = ref(false)

function togglePanel() {
  isClicked.value = true
  showPanel.value = !showPanel.value
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
</script>

<template>
  <!-- 悬浮添加按钮 -->
  <button
    @click="togglePanel"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :class="[
      isDark ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-400 hover:bg-amber-500',
      'fixed bottom-8 right-8 text-white rounded-full w-14 h-14 text-3xl flex items-center justify-center shadow-lg transition-all duration-200 z-50'
    ]"
    :style="{ transform: transformStyle }"
  >
    <span v-if="!showPanel">+</span>
    <span v-else>-</span>
  </button>

  <!-- 展开的浮动面板 -->
  <Transition name="fade-slide">
    <div
      v-if="showPanel"
      class="fixed bottom-28 right-8 w-80 bg-white shadow-xl rounded-xl p-4 border border-gray-200 z-40"
      :class="{ 'dark:bg-gray-800 dark:text-white': isDark }"
    >
      <h3 class="text-lg font-semibold mb-2">新订单</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">这里可以放表单、按钮或链接。</p>
    </div>
  </Transition>
</template>

<style scoped>
/* 展开面板动画 */
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
