<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'
import { useUserStore } from '@/stores/user.ts'
import { categories } from '@/data/categories.ts'
import Router from '@/router'

import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import { cities } from '@/data/cities.ts'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

const { inputClass, buttonClass } = useFormClasses()

const userStore = useUserStore()
const token = ref(userStore.checkToken())

const benefits = [
  "Access to thousands of local clients",
  "Flexible schedules – set your own hours",
  "Secure payments & easy withdrawals",
  "24/7 support from our team",
];

const formVisible = ref(false);

function LoginClick() {
  if (!token.value) {
    Router.push('/auth/register')
    return
  }
  formVisible.value = !formVisible.value
}

const loading = ref(false)
const form = reactive({
      categories: '',
      experiences:'',
      city:'',
      yearsOfService:''
})

const submit = async () => {
  try {
    await axios.post(urls.becomeProvider, {...form}, {
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

</script>

<template>
  <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800','min-h-screen flex flex-col transition-colors duration-500']">
    <HeaderBar />

    <div class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-extrabold text-center mb-10 dark:text-amber-400">Become a Provider</h2>

      <div :class="[isDark ? 'bg-gray-800' : 'bg-white','w-full max-w-4xl rounded-3xl shadow-xl p-10 space-y-8']">
        <h3 class="text-2xl font-bold text-center">Why join AlloMaison?</h3>

        <ul class="space-y-4">
          <li v-for="item in benefits" :key="item" class="flex items-start space-x-3">
            <span class="text-amber-400 mt-1">✔︎</span>
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="flex justify-center">
          <button @click="LoginClick" :class="[buttonClass]">
            {{ formVisible ? 'Close Form' : 'Start Registration' }}
          </button>
        </div>

        <form v-if="formVisible" class="grid sm:grid-cols-2 gap-6 mt-8" @submit.prevent="submit">
          <input v-model="form.yearsOfService" placeholder="Years of service" type="number" :class="[inputClass]" required />
          <select  v-model="form.city" :class="inputClass">
            <option value="" disabled selected hidden>City</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
          <select v-model="form.categories" :class="[inputClass]" required>
            <option value="" disabled selected hidden>Primary Service Category</option>
            <option :value='{category}' v-for="category in categories" :key="category">{{ category }}</option>
          </select>
          <textarea v-model="form.experiences" placeholder="Tell us about your experience..." rows="4" :class="[inputClass,'sm:col-span-2']"></textarea>
          <button type="submit" :class="[buttonClass,'sm:col-span-2']" :disabled="loading"> Submit Application </button>
        </form>

      </div>
    </div>

    <FooterBar />
  </div>
</template>


<style scoped>

</style>