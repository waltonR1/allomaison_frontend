import { defineStore } from 'pinia'
import { fetchProviderDetail, fetchProviders } from '@/api/noTokenAPI.ts'
import type { ProviderCard } from '@/types/types'

type ProvidersState = {
  providerCards: ProviderCard[]
  loading: boolean
  error: string | null
  fetched: boolean
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

    /** 按需加载 provider 的详细信息 */
    async fetchProviderDetailIfNeeded(providerId: number): Promise<void> {
      const target = this.providerCards.find(p => p.providerId === providerId);
      if (!target) return;

      try {
        const detail = await fetchProviderDetail(providerId);
        const { rating, customerReviews } = detail;

        this.providerCards = this.providerCards.map(p =>
          p.providerId === providerId
            ? {
              ...p,
              rating,
              customerReview: customerReviews,
            }
            : p
        );
      } catch (e: any) {
        console.error(`Failed to fetch provider detail for ${providerId}:`, e);
      }
    }
  },
  persist: true,
});
