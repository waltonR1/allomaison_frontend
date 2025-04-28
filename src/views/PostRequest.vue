<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'
import { categories } from '@/data/categories.ts'

import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import Router from '@/router'
import { useUserStore } from '@/stores/user.ts'
import { cities } from '@/data/cities.ts'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const userStore = useUserStore()
const token = ref(userStore.checkToken())


const loading = ref(false)
const form = reactive({
  title: '',
  category: '',
  description: '',
  frequency: '',
  city: ''
})


const submit = async () => {
  if (!token.value) {
    await Router.push('/auth/login')
    return
  }
  try {
    await axios.post(urls.postRequest, {...form}, {
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

const { inputClass, buttonClass } = useFormClasses()

</script>

<template>
  <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white', 'min-h-screen flex flex-col transition-colors duration-500']">
    <HeaderBar />

    <div class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Post a Service Request</h1>

        <form  @submit.prevent="submit" class="space-y-6">
          <input id="title" v-model="form.title" type="text" required :class="inputClass" placeholder="Title" />

          <select id="category" v-model="form.category" :class="inputClass">
            <option value="" selected disabled hidden>Primary Service Category</option>
            <option :value=category v-for="category in categories" :key="category">{{ category }}</option>
          </select>



          <textarea id="description" v-model="form.description" rows="4" required :class="[inputClass, 'resize-none']" placeholder="Describe your request"></textarea>

          <select id="frequency" v-model="form.frequency" :class="inputClass">
            <option value="" selected disabled hidden>Frequence</option>
            <option value="OneTime">One‑time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>

          <select  v-model="form.city" :class="inputClass">
            <option value="" disabled selected hidden>City</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>

          <button type="submit" :class="buttonClass" :disabled="loading">Submit Request</button>
        </form>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<style scoped>

</style>
