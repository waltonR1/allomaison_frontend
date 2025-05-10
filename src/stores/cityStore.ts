import { defineStore } from 'pinia'
import axios from 'axios'
import { urls } from '@/utils/urls.ts'

type City = {
  city: string
  zipcode: string
}

export const useCityStore = defineStore('cityStore', {
  state: () => ({
    cities: [] as City[],
    loading: false,
    error: ''
  }),
  actions: {
    async fetchCities() {
      if (this.cities.length > 0) return // 已缓存就不再请求

      this.loading = true
      try {
        const res = await axios.get(urls.getCities) // 假设后端提供这个接口
        this.cities = res.data
      } catch (e: any) {
        this.error = e.message || 'Failed to load cities'
      } finally {
        this.loading = false
      }
    }
  }
})
