<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Router from '@/router'

import { useThemeStore } from '@/stores/themeStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { useUserStore } from '@/stores/userStore.ts'
import {useCategoriesStore} from '@/stores/categoriesStore.ts'
import { useCityStore } from '@/stores/cityStore.ts'
import { submitProviderApplication } from '@/api/withTokenAPI.ts'

// stores
const categoriesStore = useCategoriesStore()
const cityStore = useCityStore()
const theme  = useThemeStore()
const userStore = useUserStore()

// state -> ref
const { isDark } = storeToRefs(theme)
const { userId, isLoggedIn } = storeToRefs(userStore)

// variable
const formVisible = ref(false);
const loading = ref(false)
const benefits = [
  "Access to thousands of local clients",
  "Flexible schedules – set your own hours",
  "Secure payments & easy withdrawals",
  "24/7 support from our team",
];

// form
export type ProviderApplicationForm = {
  idNumber: string
  yearsOfService: string
  city: string
  categories: string
  experiences: string
  certifications: File[]
}

const form: ProviderApplicationForm= reactive({
      idNumber: '',
      yearsOfService: '',
      city: '',
      categories: '',
      experiences: '',
      certifications: []
})

// check login
const LoginClick = () => {
  if (!isLoggedIn.value) {
    Router.push('/auth/login')
    return
  }
  formVisible.value = !formVisible.value
}

// limit of files
const handleCertUpload = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target && target.files) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    const maxFileSize = 25 * 1024 * 1024 // 25MB
    const validFiles: File[] = []

    for (const file of Array.from(target.files)) {
      if (!allowedTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Only PDF, JPG, and PNG are allowed.`)
        continue
      }
      if (file.size > maxFileSize) {
        alert(`File too large: ${file.name}. Max size is 5MB.`)
        continue
      }
      validFiles.push(file)
    }

    form.certifications = validFiles
  }
}

// submit the application
const submit = async () => {
  try {
    loading.value = true

    await submitProviderApplication(Number(userId.value) ?? -1, form)
    alert('Successfully, Please wait for approval.')
    await Router.push('/')
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'Failed');
  }finally {
    loading.value = false
  }
}

/* loading */
onMounted(() => {
  cityStore.fetchCities()
  categoriesStore.fetchCategories()
})

/* css utils */
const { inputClass, noPlaceholderInputClass, buttonClass, fileInputClass } = useFormClasses()
</script>

<template>
    <main class="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h2 :class="[isDark ? 'text-amber-400' : '', 'text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-10']">Become a Provider</h2>

      <div :class="[isDark ? 'bg-gray-800' : 'bg-white','w-full max-w-4xl rounded-3xl shadow-xl p-6 sm:p-10 space-y-8']">
        <h3 class="text-xl sm:text-2xl font-bold text-center">Why join AlloMaison?</h3>

        <ul class="space-y-4">
          <li v-for="item in benefits" :key="item" class="flex items-start space-x-3">
            <span class="text-amber-400 mt-1">✔︎</span>
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="flex justify-center">
          <button @click="LoginClick" :class="[buttonClass, 'w-full']">
            {{ formVisible ? 'Close Form' : 'Start Registration' }}
          </button>
        </div>

        <form v-if="formVisible" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8" @submit.prevent="submit">
          <input v-model="form.idNumber" placeholder="ID Number" type="text" :class="inputClass" required />
          <input v-model="form.yearsOfService" placeholder="Years of service" type="number" :class="inputClass" required />
          <select  v-model="form.city" :class="noPlaceholderInputClass(form.city)">
            <option value="" disabled selected hidden>City</option>
            <option v-for="city in cityStore.cities" :key="city.zipcode" :value="city">{{ city.city }}</option>
          </select>
          <select v-model="form.categories" :class="noPlaceholderInputClass(form.categories)" required>
            <option value="" disabled selected hidden>Primary Service Category</option>
            <option :value="category.category" v-for="category in categoriesStore.categories" :key="category.category">{{ category.category }}</option>
          </select>
          <textarea v-model="form.experiences" placeholder="Briefly describe your past work experience, specialties, and notable clients..." rows="4" :class="[inputClass,'col-span-2']"></textarea>
          <div class="flex flex-col gap-2 col-span-2">
          <input type="file" @change="handleCertUpload" multiple :class="fileInputClass" accept=".pdf,.jpg,.jpeg,.png"/>
          <p :class="[isDark ? 'text-gray-400' : 'text-gray-500','text-sm']"> Please upload any relevant qualification certificates, such as a babysitting license, cleaning certification, or other professional credentials. </p>
          </div>
          <button type="submit" :class="[buttonClass,'sm:col-span-2']" :disabled="loading"> Submit Application </button>
        </form>

      </div>
    </main>
</template>

<style scoped>

</style>