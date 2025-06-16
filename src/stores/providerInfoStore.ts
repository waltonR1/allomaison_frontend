import { defineStore } from 'pinia'
import { fetchProviderInfo } from '@/api/withTokenAPI.ts'
import type { ProviderInfo } from '@/types/types'

type ProviderInfoState = ProviderInfo & {
  loading: boolean;
  error: string;
};

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
        this.$patch(response)
      } catch (error: any) {
        this.error = error.message || 'Loading provider info Failed'
        console.error('Loading provider info Failed:', this.error)
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