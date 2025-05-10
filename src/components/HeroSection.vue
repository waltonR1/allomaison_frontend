<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)
</script>

<template>
  <section :class="[isDark ? 'bg-gray-800' : 'bg-amber-50','py-20 text-center transition-colors duration-500']">
    <h2 :class="[isDark ? 'text-amber-400' : 'text-amber-700','text-5xl font-extrabold mb-6 transition-transform transform hover:scale-105 duration-300 select-none']">
      Home Services, Simplified
    </h2>

    <p class="text-lg mb-10 select-none">Certified helpers available nationwide at your doorstep</p>

    <div class="flex justify-center space-x-6">
      <RouterLink to="/findProvider" class="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-white rounded-xl text-lg transition select-none">
        Find Providers
      </RouterLink>
      <RouterLink to="/postTask" class="px-8 py-3 border-2 border-amber-400 text-amber-600 hover:bg-amber-100 rounded-xl text-lg transition select-none">
        Post My Task
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
</style>