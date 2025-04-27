<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'
import { categories } from '@/data/categories.ts'

import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const form = reactive({
  title: '',
  category: 'Cleaning',
  description: '',
  frequency: 'One‑time',
  city: ''
})

const submitted = ref(false)

function submit () {
  console.log('PostRequest data', { ...form })
  submitted.value = true
}

const { inputClass, buttonClass } = useFormClasses()
</script>

<template>
  <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white', 'min-h-screen flex flex-col transition-colors duration-500']">
    <HeaderBar />

    <div class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-3xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Post a Service Request</h1>

        <form v-if="!submitted" @submit.prevent="submit" class="space-y-6">
          <input id="title" v-model="form.title" type="text" required :class="inputClass" placeholder="Title" />

          <select id="category" v-model="form.category" :class="inputClass">
            <option value="All" selected >Primary Service Category</option>
            <option v-for="category in categories" :key="category">{{ category }}</option>
          </select>



          <textarea id="description" v-model="form.description" rows="4" required :class="[inputClass, 'resize-none']" placeholder="Describe your request"></textarea>

          <select id="frequency" v-model="form.frequency" :class="inputClass">
            <option>One‑time</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          <input id="city" v-model="form.city" type="text" required :class="inputClass" placeholder="City" />

          <button type="submit" :class="buttonClass">Submit Request</button>
        </form>

        <div v-else class="text-center space-y-4">
          <p>Your request has been posted successfully! 🎉</p>
          <router-link to="/" :class="buttonClass">Back to Home</router-link>
        </div>
      </div>
    </div>

    <FooterBar />
  </div>
</template>

<style scoped>

</style>
