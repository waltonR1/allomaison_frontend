import { defineStore } from 'pinia';
import { login } from '@/api/noTokenAPI.ts'
import type { UserState } from '@/types/types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: null,
    role:  null,
    userId:  null,
    avatarUrl: null,
    userName: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    async login(values: { email: string; password: string }) {
      try {
        const response = await login(values);

        this.$patch(response[0])
      } catch (error: any) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Login failed');
      }
    },
    logout() {
      this.$reset()
    }
  },
  persist: true
});