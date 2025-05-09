<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'
import { categories } from '@/data/categories.ts'

import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import Router from '@/router'
import { useUserStore } from '@/stores/user.ts'
import { cities } from '@/data/cities.ts'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const userStore = useUserStore()
const { user_id } = storeToRefs(userStore)
const token = ref(userStore.checkToken())


const loading = ref(false)
const form = reactive({
  title: '',
  category: '',
  frequency: '',
  city: '',
  datetime: '',
  address: '',
  budget:'',
  contact:'',
  description: ''
})


const submit = async () => {
  if (!token.value) {
    await Router.push('/auth/login')
    return
  }
  try {
    await axios.post(urls.postTask, {user_id: user_id.value,...form}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'Failed');
  }
  alert('Successfully, Please wait for approval.')
  await Router.push('/')
}

const { inputClass, buttonClass, noPlaceholderInputClass } = useFormClasses()

</script>

<template>
    <main class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Post a Task</h1>

        <form  @submit.prevent="submit" class="space-y-6">
          <input id="title" v-model="form.title" type="text" required :class="inputClass" placeholder="Task Title" />
          <select id="category" v-model="form.category" :class="noPlaceholderInputClass(form.category)">
            <option value="" selected disabled hidden>Service Category</option>
            <option :value=category v-for="category in categories" :key="category">{{ category }}</option>
          </select>
          <select id="frequency" v-model="form.frequency" :class="noPlaceholderInputClass(form.frequency)">
            <option value="" selected disabled hidden>Frequence</option>
            <option value="OneTime">One‑time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <select  v-model="form.city" :class="noPlaceholderInputClass(form.city)">
            <option value="" disabled selected hidden>City</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
          <input v-if="form.frequency !== 'OneTime'" type="datetime-local" v-model="form.datetime" :class="inputClass" required />
          <input type="text" v-model="form.address" placeholder="Street Address" :class="inputClass" required />
          <input type="number" v-model="form.budget" placeholder="Budget (€)" :class="inputClass" min="0" required />
          <input type="text" v-model="form.contact" placeholder="Contact Info (Phone or Email)" :class="inputClass" required />
          <textarea id="description" v-model="form.description" rows="4" required :class="[inputClass, 'resize-none']" placeholder="Task Description"></textarea>
          <button type="submit" :class="buttonClass" :disabled="loading">Submit Request</button>
        </form>
      </div>
    </main>
</template>

<style scoped>

</style>
