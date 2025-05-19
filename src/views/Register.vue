<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'

import Router from '@/router'
import { register } from '@/api/noTokenAPI.ts'
import router from '@/router'
import { useUserStore } from '@/stores/userStore.ts'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const loading = ref(false)

export type registerForm = {
  firstName: string,
  lastName:string,
  userName: string,
  gender:string,
  birthday:string,
  email: string,
  password: string,
  confirmPassword: string,
  agree: boolean,
}

const form:registerForm = reactive({
  firstName: '',
  lastName:'',
  userName: '',
  gender:'',
  birthday:'',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const passwordDifferent = computed(() => {
  return form.password !== form.confirmPassword;
});

const submitRegister = async () => {
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
    await register(form)

    // 或者提示邮箱验证？后端去发送？
    alert('Successfully registered')
    await Router.push('/auth/login')

  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.response?.data || 'register failed');
  }finally {
    loading.value = false
  }
}

const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
onMounted(() => {
  if (isLoggedIn.value) {
    router.replace('/')
  }
})

const { inputClass, noPlaceholderInputClass, buttonClass } = useFormClasses()

</script>

<template>
    <main class="flex flex-1 items-center justify-center py-12 px-4">
      <div :class="[isDark ? 'bg-gray-800' :'bg-white','w-full max-w-md space-y-8 p-8 rounded-2xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Create account</h1>

        <form @submit.prevent="submitRegister" class="space-y-6">
          <input v-model="form.firstName" type="text" :class="inputClass" placeholder="First Name*" required />
          <input v-model="form.lastName" type="text" :class="inputClass" placeholder="Last Name*" required />
          <input v-model="form.userName" type="text" :class="inputClass" placeholder="Username*" required />
          <select v-model="form.gender" type="text" :class="noPlaceholderInputClass(form.gender)" required>
            <option value="" disabled selected hidden>Gender*</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input v-model="form.birthday" type="date" :class="noPlaceholderInputClass(form.birthday)" required />
          <input v-model="form.email" type="email" :class="inputClass" placeholder="Email*" required />
          <input v-model="form.password" type="password" :class="inputClass" placeholder="Password*" required minlength="6"/>
          <input v-model="form.confirmPassword" type="password" :class="inputClass" placeholder="Confirm Password*" required minlength="6"/>
          <div v-if="passwordDifferent" class="text-red-500 text-sm">
            The two passwords do not match
          </div>

          <div class="flex items-center space-x-2">
            <input type="checkbox" v-model="form.agree" class="form-checkbox" />
            <label for="agree" class="text-sm">
              I agree to the <router-link to="/auth/terms" class="text-blue-500 underline">Terms of Service</router-link>
            </label>
          </div>

          <button type="submit" :class="[buttonClass,'w-full']" :disabled="loading">Create account</button>
        </form>

        <router-link to="/auth/login" class="block text-sm text-center mt-4 hover:underline">
          Already have an account? Login
        </router-link>
      </div>
    </main>
</template>


<style scoped>

</style>