import { defineStore } from 'pinia'
import { fetchCategories } from '@/api/noTokenAPI.ts'
import type { CategoriesState } from '@/types/types'

export const useCategoriesStore = defineStore('categoriesStore', {
  state: (): CategoriesState => ({
    categories: [],
    loading: false,
    error: ''
  }),

  actions: {
    async fetchCategories(force = false) {
      if (this.categories.length > 0 && !force) return // 已缓存就不再请求

      this.loading = true
      try {
        this.categories = await fetchCategories() // 假设后端提供这个接口
      } catch (e: any) {
        this.error = e.message || 'Failed to load cities'
      } finally {
        this.loading = false
      }
    }
  }
})
