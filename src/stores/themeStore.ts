import { defineStore } from 'pinia'
import type { ThemeState } from '@/types/types'

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    isDark: false,
  }),

  actions: {
    toggle() {
      this.isDark = !this.isDark
    },
  },

  // pinia-plugin-persistedstate
  persist: true,
})
