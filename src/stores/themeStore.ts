import { defineStore } from 'pinia'

type ThemeState = {
  isDark: boolean,
}

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
