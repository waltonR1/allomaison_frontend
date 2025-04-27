import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
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
