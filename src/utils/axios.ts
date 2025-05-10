import axios from 'axios'
import { useUserStore } from '@/stores/userStore.ts'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '', // 从 .env 读取
  timeout: 10000
})

instance.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

export default instance
