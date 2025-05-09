<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'
import { providerCards } from '@/data/serviceCard.ts'
import { cities } from '@/data/cities.ts';
import { categories } from '@/data/categories.ts'
import { useRoute } from 'vue-router'

const route = useRoute();

const search   = ref('')
const category = ref('All')
const city     = ref('All')

const filtered = computed(() =>
  providerCards.filter(s => {
    const matchText = s.description.toLowerCase().includes(search.value.toLowerCase())
    const matchCat = category.value === 'All' || s.category === category.value
    const matchLocation = city.value === 'All' || s.city === city.value
    return matchText && matchCat && matchLocation
  })
)

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
const { inputClass } = useFormClasses()

onMounted(() => {
  const categoryFromQuery = route.query.category as string;
  if (categoryFromQuery) {
    category.value = categoryFromQuery;
  }
});
</script>

<template>
    <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-7xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Find Providers</h1>

        <div class="grid gap-6 sm:grid-cols-2 mb-8">
          <input v-model="search" :class="inputClass" placeholder="Search services..." />
          <select v-model="category" :class="inputClass">
            <option value="All" disabled hidden>Primary Service Category</option>
            <option value="All">All</option>
            <option v-for="category in categories" :key="category">{{ category }}</option>
          </select>
          <select v-model="city" :class="inputClass">
            <option value="All" disabled hidden>City</option>
            <option value="All">All</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="providerCard in filtered" :key="providerCard.id" :class="[isDark ? 'bg-gray-700' : 'bg-white', 'rounded-2xl shadow-md p-6 hover:shadow-xl transition group']">
            <RouterLink :to="{ name: 'providerDetail', params: { id: providerCard.id } }" :class="[isDark ? 'text-amber-400' : '','text-xl font-bold mb-2 group-hover:text-amber-500']">{{ providerCard.provider }}</RouterLink>
            <p :class="[isDark ? 'text-gray-400' : 'text-gray-500 ','mb-4 text-sm']">{{ providerCard.city }} • {{ providerCard.category }}</p>
            <p class="text-sm mb-4">{{ providerCard.description }}</p>
            <p class="text-sm text-yellow-500">★ {{ providerCard.rating }}/5</p>
          </div>
        </div>
      </div>
    </main>
</template>

<style scoped>
</style>
