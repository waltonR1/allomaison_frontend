import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import type { Category } from '@/stores/categoriesStore.ts'
import type { City } from '@/stores/cityStore.ts'
import type { TaskCard } from '@/stores/tasksStore.ts'
import type { ProviderCard } from '@/stores/providersStore.ts'
import type { loginForm } from '@/views/Login.vue'
import type { registerForm } from '@/views/Register.vue'

//获取categories
export async function fetchCategories(): Promise<Category[]> {
  const response = await axios.get<Category[]>(urls.getCategories)
  return response.data
}

//获取city
export async function fetchCities(): Promise<City[]> {
  const response = await axios.get<City[]>(urls.getCities)
  return response.data
}

// 遍历provider
export async function fetchProviders(): Promise<ProviderCard[]> {
  const response = await axios.get<ProviderCard[]>(urls.getProvider)
  return response.data
}

// 遍历task
export async function fetchTasks(): Promise<TaskCard[]> {
  const response = await axios.get<TaskCard[]>(urls.getTask)
  return response.data
}

//login
export async function login( loginForm: loginForm ) {
  return await axios.post(urls.login,
    { ...loginForm }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
}

//register
export async function register(registerForm: registerForm) {
  await axios.post(urls.register,{...registerForm},{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}