<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { categories } from '@/data/categories'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

const props = defineProps<{
  showPage: boolean
}>()
</script>

<template>
  <section :class="[isDark ? 'bg-gray-900' : 'bg-white','py-16 px-6 transition-colors duration-500 select-none']">

    <h3 class="text-3xl font-semibold text-center mb-10">
      Popular Service Categories
    </h3>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div
        v-for="(title, idx) in categories"
        :key="title"
        :class="[
          props.showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          isDark ? 'bg-gray-800' : 'bg-white',
          'rounded-2xl shadow-md hover:shadow-xl p-6 text-center transition-all duration-700 delay-' + (idx * 100)
        ]">

        <div :class="[isDark ? 'text-amber-400' : 'text-amber-700','text-xl font-bold mb-4']">
          {{ title }}
        </div>
        <RouterLink :to="{ path:'/findProvider', query:{ category: title } }" class="text-sm text-amber-500 hover:underline">Learn More</RouterLink>
      </div>
    </div>
  </section>
</template>


<style scoped>

</style>
