import { defineStore } from 'pinia'
import { fetchProviders } from '@/api/noTokenAPI.ts'
import type { ProviderCard, ProvidersState } from '@/types/types'

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
