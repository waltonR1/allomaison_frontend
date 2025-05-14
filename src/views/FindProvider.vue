<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import { useThemeStore } from '@/stores/themeStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { useProvidersStore } from '@/stores/providersStore.ts'
import { useCityStore } from '@/stores/cityStore.ts'
import { useCategoriesStore } from '@/stores/categoriesStore.ts'

// stores
const providersStore = useProvidersStore()
const cityStore = useCityStore()
const categoriesStore = useCategoriesStore()
const theme = useThemeStore()

// state -> ref
const { providerCards } = storeToRefs(providersStore)
const { isDark } = storeToRefs(theme)

// variable
const search = ref('')
const category = ref<'All' | string>('All')
const city = ref<'All' | string>('All')

// filter
const filtered = computed(() => {

  if (!providerCards.value?.length) return []

  const text = search.value.trim().toLowerCase()

  return providerCards.value.filter((p) => {
    const matchText = !text || p.description.toLowerCase().includes(text) || p.provider.toLowerCase().includes(text)
    const matchCat = category.value === 'All' || p.category === category.value
    const matchCity = city.value === 'All' || p.city === city.value

    return matchText && matchCat && matchCity
  })
})

// loading
const route = useRoute()
onMounted(async () => {
  await Promise.all([
    providersStore.fetchProviders(),
    cityStore.fetchCities(),
    categoriesStore.fetchCategories()
  ])

  /* 若 URL 上带有 ?category=xxx 则自动选中 */
  const categoryFromQuery = route.query.category as string | undefined
  if (categoryFromQuery) category.value = categoryFromQuery
})

// css utils
const { inputClass } = useFormClasses()
</script>

<template>
  <main class="flex-1 py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-7xl mx-auto p-8 rounded-3xl shadow-2xl transition duration-500']">
      <h1 class="text-center text-2xl font-bold mb-6">Find Providers</h1>

      <div class="grid gap-6 sm:grid-cols-2 mb-8">
        <input v-model="search" :class="inputClass" placeholder="Search services..." />
        <select v-model="category" :class="inputClass">
          <option disabled hidden value="All">Primary Service Category</option>
          <option value="All">All</option>
          <option v-for="category in categoriesStore.categories" :key="category.category">{{ category.category }}
          </option>
        </select>
        <select v-model="city" :class="inputClass">
          <option disabled hidden value="All">City</option>
          <option value="All">All</option>
          <option v-for="city in cityStore.cities" :key="city.zipcode">{{ city.city }}</option>
        </select>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="providerCard in filtered" :key="providerCard.providerId" :class="[isDark ? 'bg-gray-700' : 'bg-white', 'rounded-2xl shadow-md p-6 hover:shadow-xl transition group']">
          <RouterLink :class="[isDark ? 'text-amber-400' : '','text-xl font-bold mb-2 group-hover:text-amber-500']" :to="{ name: 'providerDetail', params: { providerId: providerCard.providerId } }">{{ providerCard.provider }}</RouterLink>
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
