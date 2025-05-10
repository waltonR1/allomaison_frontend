<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

const props = defineProps<{showPage: boolean }>()

</script>

<template>
  <section
    :class="[isDark ? 'bg-gray-800' : 'bg-amber-100','py-16 px-6 transition-colors duration-500 select-none']">

    <h3 class="text-3xl font-semibold text-center mb-10">Latest Requests</h3>

    <div class="grid md:grid-cols-3 gap-8">
      <div
        v-for="(id, idx) in [1, 2, 3]"
        :key="id"
        :class="[
          props.showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          isDark ? 'bg-gray-700' : 'bg-white',
          'rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-700 delay-' + (idx * 150)
        ]">

        <div class="flex items-center mb-4">
          <div :class="[isDark ? 'bg-amber-600' : 'bg-amber-100','w-12 h-12 rounded-full mr-4']" />
          <div>
            <p class="font-bold">User{{ id }}</p>
            <p class="text-xs text-gray-500">City</p>
          </div>
        </div>

        <h4 :class="[isDark ? 'text-amber-400' : 'text-amber-700','text-lg font-bold mb-2']">
          Looking for a Housekeeper
        </h4>

        <p class="text-sm mb-4">
          Need a cleaner twice a week, mainly for the kitchen and bathrooms.
        </p>

        <p class="text-xs text-right text-gray-400">5 minutes ago</p>
      </div>
    </div>
  </section>
</template>



<style scoped>

</style>