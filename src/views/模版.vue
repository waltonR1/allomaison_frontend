<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'

const theme = useThemeStore()

const { isDark } = storeToRefs(theme)


</script>

<template>

    <div class="flex flex-1 items-center justify-center py-12 px-4">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-7xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
      </div>
    </div>

</template>

<style scoped>

</style>