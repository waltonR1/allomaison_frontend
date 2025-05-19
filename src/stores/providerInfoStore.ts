import { defineStore } from 'pinia'
import { fetchProviderInfo } from '@/api/withTokenAPI.ts'

export type ProviderInfo = {
  userId: number | null
  providerId: number | null   //后端生成
  category: string            // 服务类别，如 Cleaning / Childcare ...
  city: string                // 所在城市
  providerName: string            // 服务者名称
  description: string         // 个人/团队简介
  servicesOffered: string[]   // 提供的具体服务
  serviceArea: string         // 服务范围说明
  availabilityTime: string    // 可用时间描述
  providerLabels: string[] // 资质 / 标签
  priceRange: string          // 价格区间，如 “€20‑€35”
}

export type ProviderInfoState = ProviderInfo & {
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