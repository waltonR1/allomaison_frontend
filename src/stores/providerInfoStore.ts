import { defineStore } from 'pinia'
import { fetchProviderInfo } from '@/api/withTokenAPI.ts'
import type { ProviderInfoState } from '@/types/types'

export const useProviderInfoStore = defineStore('providerInfo', {
  state: (): ProviderInfoState => ({
    userId: null,
    providerId: null,
    category:'',
    city:'',
    providerName:'',
    description:'',
    servicesOffered:[],
    serviceArea:'',
    availabilityTime:'',
    providerLabels:[],
    priceRange:'',
    loading: false,
    error: ''
  }),

  actions: {
    // 获取用户信息
    async fetchProviderInfo(userId: number) {
      if (this.userId && this.providerName) return null

      this.loading = true
      this.error = ''

      try {
        const response = await fetchProviderInfo(userId)
        this.$patch(response[0])
      } catch (error: any) {
        this.error = error.message || '获取用户信息失败'
        console.error('获取用户信息失败:', this.error)
      } finally {
        this.loading = false
      }
    },

    // 重置用户信息（如登出后）
    reset() {
      this.$reset()
    }
  }
})