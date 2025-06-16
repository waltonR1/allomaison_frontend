import { defineStore } from 'pinia';
import { adminLogin as adminLoginAPI } from '@/api/noTokenAPI.ts'

type AdminState = {
  token: string | null;
  adminId: number | null;
  adminName: string | null;
  expiresAt: number | null;
}

export const useAdminStore = defineStore('admin', {
  state: (): AdminState => ({
    token: null,
    adminId:  null,
    adminName: null,
    expiresAt: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    async adminLogin(values: { adminName: string; password: string }) {
      try {
        const data = await adminLoginAPI(values);
        const oneHour = 60 * 60 * 1000;

        this.$patch({
          ...data,
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