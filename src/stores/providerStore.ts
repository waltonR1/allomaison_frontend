import { defineStore } from 'pinia'
import { providerLabel } from '@/data/providerLabel.ts'
import { fetchProviders } from '@/api/noTokenAPI.ts'

export type ProviderCard = {
  providerId: number
  category: string            // 服务类别，如 Cleaning / Childcare ...
  city: string                // 所在城市
  provider: string            // 服务者名称
  description: string         // 个人/团队简介
  rating: number              // 平均评分 0‑5
  avatarUrl: string           // 头像
  servicesOffered: string[]   // 提供的具体服务
  serviceArea: string         // 服务范围说明
  availabilityTime: string    // 可用时间描述
  customerReview: {            // 最近的顾客评价（可选）
    author: string
    content: string
  }[]
  providerLabels: providerLabel[] // 资质 / 标签
  priceRange: string          // 价格区间，如 “€20‑€35 / h”
}

type ProvidersState = {
  providerCards: ProviderCard[]   // 所有服务者
  loading: boolean       // 加载中
  error: string | null
  fetched: boolean// 错误信息
}

export const useProvidersStore = defineStore('providers', {
  state: (): ProvidersState => ({
    providerCards: [],
    loading: false,
    error: null,
    fetched: false,
  }),

  getters: {
    /** 根据 providerId 获取单个服务者 */
    getById: (state) => (providerId: number): ProviderCard | undefined =>
      state.providerCards.find((p) => p.providerId === providerId),
  },

  actions: {
    /** 从后端获取全部服务者列表（默认只在第一次调用时请求，可用 force=true 强制刷新） */
    async fetchProviders(force = false): Promise<void> {
      if (this.providerCards.length > 0 && !force) return;

      this.loading = true;
      try {
        this.providerCards = await fetchProviders();
        this.error = null;
        this.fetched = true;
      } catch (error: any) {
        console.error('failed:', error);
        this.error = error?.message ?? 'failed to load providers';
      } finally {
        this.loading = false;
      }
    },
  },
});
