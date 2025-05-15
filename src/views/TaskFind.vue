<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

import { useThemeStore } from '@/stores/themeStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { useTasksStore } from '@/stores/taskStore.ts'
import { useCityStore } from '@/stores/cityStore.ts'
import { useCategoriesStore } from '@/stores/categoriesStore.ts'

// stores
const tasksStore = useTasksStore()
const cityStore = useCityStore()
const categoriesStore = useCategoriesStore()
const theme = useThemeStore()

// state -> ref
const { taskCards } = storeToRefs(tasksStore)
const { isDark } = storeToRefs(theme)

// variable
const search = ref('')
const category = ref<'All' | string>('All')
const city = ref<'All' | string>('All')

// filter
const filtered = computed(() => {

  if (!taskCards.value?.length) return []

  const text = search.value.trim().toLowerCase()

  return taskCards.value.filter((p) => {
    const matchText = !text || p.description.toLowerCase().includes(text) || p.title.toLowerCase().includes(text)
    const matchCat = category.value === 'All' || p.category === category.value
    const matchCity = city.value === 'All' || p.city === city.value

    return matchText && matchCat && matchCity
  })
})

// loading
const route = useRoute()
onMounted(async () => {
  await Promise.all([
    tasksStore.fetchTasks(),
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
      <h1 class="text-center text-4xl font-bold mb-6">Find Tasks</h1>

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
        <div v-for="taskCard in filtered" :key="taskCard.taskId" :class="[isDark ? 'bg-gray-700' : 'bg-white', 'rounded-2xl shadow-md p-6 hover:shadow-xl transition group']">
          <RouterLink :class="[isDark ? 'text-amber-400' : '','text-xl font-bold mb-2 group-hover:text-amber-500']" :to="{ name: 'taskDetail', params: { taskId: taskCard.taskId } }">{{ taskCard.title }}</RouterLink>
          <p :class="[isDark ? 'text-gray-400' : 'text-gray-500 ','mb-4 text-sm']">{{ taskCard.city }} • {{ taskCard.category }}</p>
          <p class="text-sm mb-4">{{ taskCard.description }}</p>
          <p class="text-xl text-yellow-500">{{ taskCard.budget }}€</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
