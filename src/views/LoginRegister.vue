<!--废弃-->

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useFormClasses } from '@/utils/useFormClasses'

import HeaderBar  from '@/components/HeaderBar.vue'
import FooterBar  from '@/components/FooterBar.vue'

const theme  = useThemeStore()
const { isDark } = storeToRefs(theme)

const mode = ref<'login' | 'register'>("login");

const { inputClass, buttonClass } = useFormClasses()

// 表单数据
const email    = ref("");
const password = ref("");
const name     = ref(""); // only for register

function submit() {
  if (mode.value === "login") {
    console.log("Login", email.value, password.value);
  } else {
    console.log("Register", name.value, email.value, password.value);
  }
  alert("Demo only – integrate your auth logic here.");
}
</script>

<template>
  <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800','min-h-screen flex flex-col transition-colors duration-500']">
    <headerBar/>

    <div class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div :class="[isDark ? 'dark:bg-gray-800' :'bg-white','w-full max-w-md space-y-8 p-8   rounded-2xl shadow-2xl transition duration-500']">
        <div class="flex justify-center mb-6 text-xl font-bold">
          <button
            :class="[mode==='login' ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-600 dark:border-amber-400' : 'text-gray-500','flex-1 pb-2 transition duration-500']"
            @click="mode='login'">
            Login
          </button>
          <button
            :class="[mode==='register' ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-600 dark:border-amber-400' : 'text-gray-500','flex-1 pb-2 transition duration-500']"
            @click="mode='register'">
            Register
          </button>
        </div>

        <form @submit.prevent="submit" class="space-y-6">
          <div v-if="mode === 'register'">
            <input
              v-model="name"
              type="text"
              placeholder="Full Name"
              :class="[inputClass]"
              required
            />
          </div>

          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Email Address"
              :class="[inputClass]"
              required
            />
          </div>

          <div>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              :class="[inputClass]"
              required
            />
          </div>

          <button type="submit" :class="[buttonClass]">
            {{ mode === 'login' ? 'Login' : 'Create Account' }}
          </button>
        </form>
      </div>
    </div>

    <footerBar/>
  </div>
</template>

<style scoped>
</style>