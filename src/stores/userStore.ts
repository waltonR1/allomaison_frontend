import { defineStore } from 'pinia';
import { login } from '@/api/noTokenAPI.ts'

type UserState = {
  token: string | null;
  role: 'customer' | 'provider' | 'admin' | null;
  userId: number | null;
  avatarUrl: string | null;
  userName: string | null;
}

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
        throw new Error(error.message || 'Login failed')
      }
    },
    logout() {
      this.$reset()

    }
  },
  persist: true
});