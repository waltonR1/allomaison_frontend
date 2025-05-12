import { defineStore } from 'pinia'
import { fetchCities } from '@/api/noTokenAPI.ts'

export type City = {
  city: string
  zipcode: string
}

type CityState = {
  cities: City[],
  loading: boolean,
  error: string
}

export const useCityStore = defineStore('cityStore', {
  state: (): CityState => ({
    cities: [],
    loading: false,
    error: ''
  }),

  actions: {
    async fetchCities(force = false) {
      if (this.cities.length > 0 && !force) return // 已缓存就不再请求

      this.loading = true
      try {
        this.cities = await fetchCities()
      } catch (e: any) {
        this.error = e.message || 'Failed to load cities'
      } finally {
        this.loading = false
      }
    }
  }
})
