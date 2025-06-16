<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import Router from '@/router'

import { useFormClasses } from '@/utils/useFormClasses.ts'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useCategoriesStore } from '@/stores/categoriesStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useCityStore } from '@/stores/cityStore.ts'
import { postTask } from '@/api/withTokenAPI.ts'
import type { TaskForm } from '@/types/types'
import { useModal } from '@/utils/useModal'

// stores
const categoriesStore = useCategoriesStore()
const cityStore = useCityStore()
const userStore = useUserStore()
const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
const { alert } = useModal()

// state -> ref
const { isLoggedIn } = storeToRefs(userStore)

// variable
const loading = ref(false)
const formStartTime = ref('')
const formEndTime = ref('')

// form
const form:TaskForm = reactive({
  title: '',
  category: '',
  frequency: '',
  zipcode:'',
  city: '',
  startTime: '',
  endTime: '',
  address: '',
  budget:'',
  customerContact:'',
  description: ''
})

const onZipCodeInput = () => {
  const match = cityStore.cities.find(c => c.zipcode === form.zipcode)
  if (match) {
    form.city = match.city
  }
}

watch(() => form.city, (newCity) => {
  const match = cityStore.cities.find(c => c.city === newCity)
  if (match) {
    form.zipcode = match.zipcode
  }
})

// post a task
const submitTask = async () => {
  if (!isLoggedIn.value) {
    await Router.push('/auth/login')
    return
  }
  try {
    loading.value = true
    form.city = form.zipcode
    await postTask(form)

    await alert('Successfully, Please wait for approval.')
    await Router.push('/')
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'Failed');
  } finally {
    loading.value = false
  }
}

watch([formStartTime, formEndTime], ([startVal, endVal]) => {
  form.startTime = startVal ? `${startVal}T08:00` : ''
  form.endTime = endVal ? `${endVal}T16:00` : ''
})

// 当「频率」或「开始日期」变化时，自动同步 endTime = startTime（仅限 Once）
watch([() => form.frequency, formStartTime], ([freq, start]) => {
  if (freq === 'Once') {
    formEndTime.value = start || ''     // start 为空时保持空字符串
  }
})


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

        <form @submit.prevent="submitTask" class="space-y-6">
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">Task Title*</span>
            <input v-model="form.title" type="text" required :class="inputClass" placeholder="Task Title*" />
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">Service Category*</span>
            <select v-model="form.category" :class="noPlaceholderInputClass(form.category)">
              <option value="" selected disabled hidden>Service Category*</option>
              <option v-for="category in categoriesStore.categories" :key="category.category">{{ category.category }}</option>
            </select>
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">Frequency*</span>
            <select v-model="form.frequency" :class="noPlaceholderInputClass(form.frequency)" required>
              <option value="" selected disabled hidden>Frequency*</option>
              <option value="Once">Once</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">ZipCode*</span>
            <input v-model="form.zipcode" type="text" placeholder="Zipcode*" @input="onZipCodeInput" :class="inputClass" />
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">City*</span>
            <select  v-model="form.city" :class="noPlaceholderInputClass(form.city)" required>
              <option value="" disabled selected hidden>City*</option>
              <option v-for="city in cityStore.cities" :key="city.zipcode">{{ city.city }}</option>
            </select>
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">Start Date</span>
            <input type="date" v-model="formStartTime" :class="inputClass" required />
          </label>
          <label class="block" v-if="!(form.frequency === '' || form.frequency === 'Once')">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">End Date</span>
            <input type="date" v-model="formEndTime" :class="inputClass" required />
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">Street Address*</span>
            <input type="text" v-model="form.address" placeholder="Street Address*" :class="inputClass" required />
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">Budget* (€)</span>
            <input type="number" v-model="form.budget" placeholder="Budget* (€)" :class="inputClass" min="0" required />
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">Contact Info* (Phone or Email)</span>
            <input type="text" v-model="form.customerContact" placeholder="Contact Info* (Phone or Email)" :class="inputClass" required />
          </label>
          <label class="block">
            <span :class="[isDark ? 'text-gray-100' : 'text-gray-900','text-sm']">Task Description*</span>
            <textarea v-model="form.description" rows="4" required :class="[inputClass, 'resize-none']" placeholder="Task Description*"></textarea>
          </label>
          <button type="submit" :class="[buttonClass,'w-full']" :disabled="loading">Submit Task</button>
        </form>
      </div>
    </main>
</template>

<style scoped>

</style>
