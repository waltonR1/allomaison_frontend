<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'

import HeaderBar      from '@/components/HeaderBar.vue'
import FooterBar      from '@/components/FooterBar.vue'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
</script>

<template>
  <main :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800', 'min-h-screen flex flex-col transition-colors duration-500']">
    <HeaderBar />
    <router-view />
    <FooterBar />
  </main>
</template>

<style scoped>

</style>