<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

/** 动态年份，用于版权行 */
const year = new Date().getFullYear()
</script>

<template>
  <footer :class="[isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600','py-10 px-6 transition-colors duration-500']">

    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      <!-- 品牌简述 -->
      <div>
        <h4 :class="[isDark ? 'text-amber-600' : 'text-amber-400','text-lg font-semibold mb-3']">
          AlloMaison
        </h4>
        <p class="text-sm leading-relaxed">
          Home services, simplified. Certified helpers at your doorstep.
        </p>
      </div>

      <!-- 快速链接 -->
      <div>
        <h4 :class="[isDark ? 'text-amber-600' : 'text-amber-400','text-lg font-semibold mb-3']">
          Quick Links
        </h4>
        <ul class="space-y-1">
          <li><RouterLink to="/providers" class="hover:underline">Find Providers</RouterLink></li>
          <li><RouterLink to="/postTask" class="hover:underline">Post a Task</RouterLink></li>
          <li><RouterLink to="/becomeProvider" class="hover:underline">Become a Provider</RouterLink></li>
        </ul>
      </div>

      <!-- 社交媒体 -->
      <div>
        <h4 class="text-lg font-semibold mb-3"
            :class="[isDark ? 'text-amber-600' : 'text-amber-400']">
          Follow Us
        </h4>
        <div class="flex flex-col space-x-4">
          <RouterLink to="#" class="hover:underline">Twitter</RouterLink>
          <RouterLink to="#" class="hover:underline">Facebook</RouterLink>
          <RouterLink to="#" class="hover:underline">Instagram</RouterLink>
        </div>
      </div>
    </div>

    <!-- 版权行 -->
    <p class="text-xs text-center mt-8">
      © {{ year }} AlloMaison. All rights reserved.
    </p>
  </footer>
</template>

<style scoped>

</style>