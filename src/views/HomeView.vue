<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useThemeStore } from '@/stores/themeStore.ts'
import { useCategoriesStore } from '@/stores/categoriesStore.ts'
import { useProvidersStore } from '@/stores/providersStore.ts'
import { useTasksStore } from '@/stores/tasksStore.ts'

/*  stores */
const providersStore = useProvidersStore()
const tasksStore = useTasksStore()
const theme = useThemeStore()
const categoriesStore = useCategoriesStore()

/* state -> ref */
const { providerCards } = storeToRefs(providersStore)
const { taskCards } = storeToRefs(tasksStore)
const { isDark } = storeToRefs(theme)

/* variable */
const showPage = ref(false)
const showImage = ref(true)

const handleImgError = () => (showImage.value = false)

function timeAgo(date:any) {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / 60000);
}

/* loading */
onMounted(async () => {
  await Promise.all([
  categoriesStore.fetchCategories(),
  providersStore.fetchProviders(),
  tasksStore.fetchTasks(),
  ])
  setTimeout(() => (showPage.value = true), 100)
})

</script>

<template>

  <section :class="[isDark ? 'bg-gray-800' : 'bg-amber-50','py-20 text-center transition-colors duration-500']">
    <h2 :class="[isDark ? 'text-amber-400' : 'text-amber-700','text-5xl font-extrabold mb-6 transition-transform transform hover:scale-105 duration-300 select-none']">
      Home Services, Simplified
    </h2>
    <p class="text-lg mb-10 select-none">Certified helpers available nationwide at your doorstep</p>
    <div class="flex justify-center space-x-6">
      <RouterLink class="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-white rounded-xl text-lg transition select-none" to="/providers">Find Providers</RouterLink>
      <RouterLink class="px-8 py-3 border-2 border-amber-400 text-amber-600 hover:bg-amber-100 rounded-xl text-lg transition select-none" to="/postTask">Post My Task</RouterLink>
    </div>
  </section>

  <section :class="[isDark ? 'bg-gray-900' : 'bg-white','py-16 px-6 transition-colors duration-500 select-none']">
    <h3 class="text-3xl font-semibold text-center mb-10">
      Popular Service Categories
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div v-for="category in categoriesStore.categories" :key="category.category" :class="[showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',isDark ? 'bg-gray-800' : 'bg-white','rounded-2xl shadow-md hover:shadow-2xl p-6 text-center transition-all duration-500 ']">
        <div :class="[isDark ? 'text-amber-400' : 'text-amber-700','text-xl font-bold mb-4']">
          {{ category.category }}
        </div>
        <RouterLink :to="{ path:'/providers', query:{ category: category.category } }" class="text-sm text-amber-500 hover:underline">Learn More</RouterLink>
      </div>
    </div>
  </section>

  <section :class="[isDark ? 'bg-gray-800' : 'bg-amber-100', 'py-16 px-6 transition-colors duration-500 select-none']">
    <h3 class="text-3xl font-semibold text-center mb-10">Latest Tasks</h3>
    <div class="grid md:grid-cols-3 gap-8">
      <div v-for="taskCard in taskCards.slice(0, 3)" :key="taskCard.id" :class="[showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',isDark ? 'bg-gray-700' : 'bg-white','relative rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all duration-500']">
        <div class="flex justify-between items-center mb-4">
          <div>
            <router-link :to="{ name: 'taskDetail', params: { id: taskCard.id } }" class="font-bold hover:underline">{{ taskCard.title }}</router-link>
            <p class="text-sm text-gray-500">{{ taskCard.city }}</p>
          </div>
          <h4 :class="[isDark ? 'text-amber-400' : 'text-amber-700', 'text-lg font-extrabold']">{{ taskCard.budget }}</h4>
        </div>
        <p class="text-sm mb-8">{{ taskCard.description }}</p>
        <p class="absolute bottom-4 right-6 text-xs text-gray-400">{{ timeAgo(taskCard.createdAt) }} minutes ago</p>
      </div>
    </div>
  </section>

  <section :class="[isDark ? 'bg-gray-900' : 'bg-white','py-16 px-6 transition-colors duration-500']">
    <h3 class="text-3xl font-semibold text-center mb-10">Top-rated Providers</h3>
    <div class="grid md:grid-cols-3 gap-8">
      <div v-for="providerCard in providerCards.slice(0, 3)" :key="providerCard.id" :class="[showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',isDark ? 'bg-gray-800' : 'bg-white','rounded-2xl shadow-md p-6 hover:shadow-2xl transition-all duration-500']">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-yellow-400 shadow-md mr-3">
            <img v-if="showImage && providerCard?.avatarUrl" :src="providerCard?.avatarUrl" alt="User avatar" class="w-full h-full object-cover" @error="handleImgError" />
            <svg v-else class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14c-3.5 0-6 2.5-6 5.5v.5h12v-.5c0-3-2.5-5.5-6-5.5zm0-2a4 4 0 100-8 4 4 0 000 8z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            </svg>
          </div>
          <div>
            <router-link :to="{ name: 'providerDetail', params: { id: providerCard.id } }" class="font-bold hover:underline">{{ providerCard.provider }}</router-link>
            <p class="text-sm text-gray-500 flex items-center"><span class="text-yellow-400 mr-1">★</span> {{ providerCard.rating }}/5</p>
          </div>
        </div>
        <p class="text-sm">{{ providerCard.description }}</p>
      </div>
    </div>
  </section>

</template>

<style scoped>
</style>