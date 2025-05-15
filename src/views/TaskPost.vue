<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Router from '@/router'

import { useFormClasses } from '@/utils/useFormClasses.ts'
import { useThemeStore } from '@/stores/themeStore.ts'
import {useCategoriesStore} from '@/stores/categoriesStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useCityStore } from '@/stores/cityStore.ts'
import { postTask } from '@/api/withTokenAPI.ts'

// stores
const categoriesStore = useCategoriesStore()
const cityStore = useCityStore()
const userStore = useUserStore()
const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

// state -> ref
const { userId,isLoggedIn } = storeToRefs(userStore)

// variable
const loading = ref(false)

// form
export type TaskForm = {
  title: string,
  category: string,
  frequency: string,
  city: string,
  datetime: string,
  address: string,
  budget:string,
  customerContact:string,
  description: string
}

const form:TaskForm = reactive({
  title: '',
  category: '',
  frequency: '',
  city: '',
  datetime: '',
  address: '',
  budget:'',
  customerContact:'',
  description: ''
})

// post a task
const submit = async () => {
  if (!isLoggedIn.value) {
    await Router.push('/auth/login')
    return
  }
  try {
    loading.value = true

    await postTask(Number(userId.value) ?? -1, form)

    alert('Successfully, Please wait for approval.')
    await Router.push('/')
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'Failed');
  } finally {
    loading.value = false
  }
}

// loading
onMounted(async () => {
  await Promise.all([
    cityStore.fetchCities(),
    categoriesStore.fetchCategories()
  ])
})

// css utils
const { inputClass, buttonClass, noPlaceholderInputClass } = useFormClasses()
</script>

<template>
    <main class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Post a Task</h1>

        <form  @submit.prevent="submit" class="space-y-6">
          <input v-model="form.title" type="text" required :class="inputClass" placeholder="Task Title" />
          <select v-model="form.category" :class="noPlaceholderInputClass(form.category)">
            <option value="" selected disabled hidden>Service Category</option>
            <option v-for="category in categoriesStore.categories" :key="category.category">{{ category.category }}</option>
          </select>
          <select v-model="form.frequency" :class="noPlaceholderInputClass(form.frequency)" required>
            <option value="" selected disabled hidden>Frequence</option>
            <option value="OneTime">One‑time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <select  v-model="form.city" :class="noPlaceholderInputClass(form.city)" required>
            <option value="" disabled selected hidden>City</option>
            <option v-for="city in cityStore.cities" :key="city.zipcode">{{ city.city }}</option>
          </select>
          <input v-if="form.frequency !== 'OneTime'" type="datetime-local" v-model="form.datetime" :class="inputClass" required />
          <input type="text" v-model="form.address" placeholder="Street Address" :class="inputClass" required />
          <input type="number" v-model="form.budget" placeholder="Budget (€)" :class="inputClass" min="0" required />
          <input type="text" v-model="form.customerContact" placeholder="Contact Info (Phone or Email)" :class="inputClass" required />
          <textarea v-model="form.description" rows="4" required :class="[inputClass, 'resize-none']" placeholder="Task Description"></textarea>
          <button type="submit" :class="[buttonClass,'w-full']" :disabled="loading">Submit Task</button>
        </form>
      </div>
    </main>
</template>

<style scoped>

</style>
