import { defineStore } from 'pinia';
import { adminLogin as adminLoginAPI, login as loginAPI } from '@/api/noTokenAPI.ts'

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
        const response = await loginAPI(values);
        this.$patch(response[0])
      } catch (error: any) {
        throw new Error(error.message || 'Login failed')
      }
    },

    async adminLogin(values: { email: string; password: string }) {
      try {
        const data = await adminLoginAPI(values);
        if (!Array.isArray(data) || data.length === 0 || data[0].role !== 'admin') {
          throw new Error('Only admin is allowed')
        }
        this.$patch(data[0])
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