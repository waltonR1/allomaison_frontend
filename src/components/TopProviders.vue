<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { providers }  from '@/data/providers'


const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

const props = defineProps<{
  showPage: boolean
}>()
</script>

<template>
  <section
    :class="[isDark ? 'bg-gray-900' : 'bg-white','py-16 px-6 transition-colors duration-500']">

    <h3 class="text-3xl font-semibold text-center mb-10">Top-rated Providers</h3>

    <div class="grid md:grid-cols-3 gap-8">
      <div
        v-for="({name}, idx) in providers"
        :key="idx"
        :class="[
          props.showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          isDark ? 'bg-gray-800' : 'bg-white',
          'rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-700 delay-' + (idx * 150)
        ]">

        <div class="flex items-center mb-4">
          <div :class="[isDark ? 'bg-amber-600' : 'bg-amber-100','w-12 h-12 rounded-full mr-4']" />
          <div>
            <p class="font-bold">{{ name }}</p>
            <p class="text-sm text-gray-500 flex items-center">
              <span class="text-yellow-400 mr-1">★</span> 4.{{ 9 - idx }}/5
            </p>
          </div>
        </div>

        <p class="text-sm">
          Specializes in home cleaning and deep sanitization, known for thorough and attentive service.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>