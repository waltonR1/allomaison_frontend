<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'
import { useUserStore } from '@/stores/user.ts'
import { categories } from '@/data/categories.ts'
import Router from '@/router'

import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import { cities } from '@/data/cities.ts'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

const { inputClass, noPlaceholderInputClass, buttonClass, fileInputClass } = useFormClasses()

const userStore = useUserStore()
const { user_id } = storeToRefs(userStore)
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
    Router.push('/auth/login')
    return
  }
  formVisible.value = !formVisible.value
}

const loading = ref(false)
const form = reactive({
      idNumber: '',
      yearsOfService: '',
      city: '',
      categories: '',
      experiences: '',
      certifications: [] as File[]
})

function handleCertUpload(event: Event) {
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


const submit = async () => {
  try {
    loading.value = true

    const formData = new FormData()
    formData.append('user_id', user_id.value ?? '')
    formData.append('idNumber', form.idNumber)
    formData.append('yearsOfService', form.yearsOfService)
    formData.append('city', form.city)
    formData.append('categories', form.categories)
    formData.append('experiences', form.experiences)
    form.certifications.forEach((file) => {
      formData.append('certifications', file) // 后端用 List<MultipartFile>
    })

    await axios.post(urls.becomeProvider, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    alert('Successfully, Please wait for approval.')
    await Router.push('/')
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'Failed');
  }finally {
    loading.value = false
  }
}

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
          <button @click="LoginClick" :class="[buttonClass]">
            {{ formVisible ? 'Close Form' : 'Start Registration' }}
          </button>
        </div>

        <form v-if="formVisible" class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8" @submit.prevent="submit">
          <input v-model="form.idNumber" placeholder="ID Number" type="text" :class="inputClass" required />
          <input v-model="form.yearsOfService" placeholder="Years of service" type="number" :class="inputClass" required />
          <select  v-model="form.city" :class="noPlaceholderInputClass(form.city)">
            <option value="" disabled selected hidden>City</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
          <select v-model="form.categories" :class="noPlaceholderInputClass(form.categories)" required>
            <option value="" disabled selected hidden>Primary Service Category</option>
            <option :value="category" v-for="category in categories" :key="category">{{ category }}</option>
          </select>
          <textarea v-model="form.experiences" placeholder="Briefly describe your past work experience, specialties, and notable clients..." rows="4" :class="[inputClass,'sm:col-span-2']"></textarea>
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