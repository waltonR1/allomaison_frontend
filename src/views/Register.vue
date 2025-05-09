<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'

import Router from '@/router'
import axios from 'axios'
import { urls } from '@/utils/urls.ts'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const loading = ref(false)
const form = reactive({
  first_name: '',
  last_name:'',
  gender:'',
  birthday:'',
  email: '',
  phone:'',
  password: '',
  confirmPassword: '',
  agree: false
})

const passwordDifferent = computed(() => {
  return form.password !== form.confirmPassword;
});

const submit = async () => {
  if (!form.agree) {
    alert('You must agree to the terms and conditions');
    return;
  }

  if (passwordDifferent.value) {
    alert('The two passwords do not match')
    return;
  }
  try {
    loading.value = true
    await axios.post(urls.register, {...form}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

    // 或者提示邮箱验证？后端去发送？
    alert('Successfully registered')
    await Router.push('/auth/login')

  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'register failed');
  }finally {
    loading.value = false
  }
}

const { inputClass, noPlaceholderInputClass, buttonClass } = useFormClasses()

</script>

<template>
    <main class="flex flex-1 items-center justify-center py-12 px-4">
      <div :class="[isDark ? 'bg-gray-800' :'bg-white','w-full max-w-md space-y-8 p-8 rounded-2xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Create account</h1>

        <form @submit.prevent="submit" class="space-y-6">
          <input v-model="form.first_name" type="text" :class="inputClass" placeholder="First Name*" required />
          <input v-model="form.last_name" type="text" :class="inputClass" placeholder="Last Name*" required />
          <select v-model="form.gender" type="text" :class="noPlaceholderInputClass(form.gender)" required>
            <option value="" disabled selected hidden>Gender*</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input v-model="form.birthday" type="date" :class="noPlaceholderInputClass(form.birthday)" required />
          <input v-model="form.email" type="email" :class="inputClass" placeholder="Email*" required />
          <input v-model="form.phone" type="text" :class="inputClass" placeholder="Phone*" required pattern="^0[1-9](\d{8})$" title="Please enter a valid phone number"/>
          <input v-model="form.password" type="password" :class="inputClass" placeholder="Password*" required minlength="6"/>
          <input v-model="form.confirmPassword" type="password" :class="inputClass" placeholder="Confirm Password*" required minlength="6"/>
          <div v-if="passwordDifferent" class="text-red-500 text-sm">
            The two passwords do not match
          </div>

          <div class="flex items-center space-x-2">
            <input type="checkbox" v-model="form.agree" id="agree" class="form-checkbox" />
            <label for="agree" class="text-sm">
              I agree to the <router-link to="/auth/terms" class="text-blue-500 underline">Terms of Service</router-link>
            </label>
          </div>

          <button type="submit" :class="buttonClass" :disabled="loading">Create account</button>
        </form>

        <router-link to="/auth/login" class="block text-sm text-center mt-4 hover:underline">
          Already have an account? Login
        </router-link>
      </div>
    </main>
</template>


<style scoped>

</style>