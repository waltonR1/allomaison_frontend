import { defineStore } from 'pinia';
import { login as loginAPI } from '@/api/noTokenAPI.ts'

type UserState = {
  token: string | null;
  role: 'customer' | 'provider' | null;
  userId: number | null;
  avatarUrl: string | null;
  userName: string | null;
  expiresAt: number | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: null,
    role:  null,
    userId:  null,
    avatarUrl: null,
    userName: null,
    expiresAt: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    async login(values: { email: string; password: string }) {
      try {
        const response = await loginAPI(values);
        const oneHour = 60 * 60 * 1000;

        const avatarUrl = response.avatarUrl
          ? `http://localhost:8080/${response.avatarUrl.replace(/^\/+/, '')}`
          : null;

        this.$patch({
          ...response,
          avatarUrl,
          expiresAt: Date.now() + oneHour
        })
      } catch (error: any) {
        throw new Error(error.message || 'Login failed')
      }
    },
    logout() {
      this.$reset()
    },
    checkExpired() {
      if (this.expiresAt && Date.now() > this.expiresAt) {
        this.logout();
      }
    }
  },
  persist: true
});