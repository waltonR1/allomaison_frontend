<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'

import HeaderBar      from '@/components/HeaderBar.vue'
import FooterBar      from '@/components/FooterBar.vue'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

</script>

<template>
  <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800','min-h-screen flex flex-col transition-colors duration-500']">

    <HeaderBar />
    <div class="flex flex-1 items-center justify-center py-12 px-4">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-7xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<style scoped>

</style>