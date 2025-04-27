<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'

import HeaderBar  from '@/components/HeaderBar.vue'
import FooterBar  from '@/components/FooterBar.vue'
import Router from '@/router'
import axios from 'axios'
import { urls } from '@/utils/urls.ts'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const loading = ref(false)
const form = reactive({
  name:'',
  gender:'',
  birthday:'',
  email: '',
  phone:'',
  password: '',
  confirmPassword: ''
})

const passwordDifferent = computed(() => {
  return form.password !== form.confirmPassword;
});

const submit = async () => {
  if (passwordDifferent.value) {
    alert('The two passwords do not match')
    return; // 阻止提交
  }
  try {
    await axios.post(urls.register, {...form}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'register failed');
  }
  // 或者提示邮箱验证？后端去发送？
  alert('Successfully registered')
  await Router.push('/auth/login')
}

const { inputClass, buttonClass } = useFormClasses()

</script>

<template>
  <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900','min-h-screen flex flex-col transition-colors duration-500']">
    <HeaderBar/>

    <div class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div :class="[isDark ? 'bg-gray-800' :'bg-white','w-full max-w-md space-y-8 p-8 rounded-2xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Create account</h1>

        <form @submit.prevent="submit" class="space-y-6">
          <input v-model="form.name"     type="text"     :class="inputClass" placeholder="Name"     required />
          <select v-model="form.gender" type="text"  :class="inputClass" required>
            <option value="" disabled selected hidden>gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input v-model="form.birthday" type="date" :class="inputClass" placeholder="Name" required />
          <input v-model="form.phone" type="text" :class="inputClass" placeholder="Phone" required pattern="^0[1-9](\d{8})$" title="Please enter a valid phone number"/>
          <input v-model="form.email" type="email" :class="inputClass" placeholder="Email" required />
          <input v-model="form.password" type="password" :class="inputClass" placeholder="Password" required minlength="6"/>
          <input v-model="form.confirmPassword" type="password" :class="inputClass" placeholder="Confirm Password" required minlength="6"/>
          <div v-if="passwordDifferent" class="text-red-500 text-sm">
            The two passwords do not match
          </div>
          <button type="submit" :class="buttonClass" :disabled="loading">Create account</button>
        </form>

        <router-link to="/auth/login" class="block text-sm text-center mt-4 hover:underline">
          Already have an account? Login
        </router-link>
      </div>
    </div>

    <FooterBar/>
  </div>
</template>


<style scoped>

</style>