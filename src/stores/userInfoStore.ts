import { defineStore } from 'pinia'
import { fetchUserInfo } from '@/api/withTokenAPI.ts'
import type {UserInfo} from '@/types/types'

type UserInfoState = UserInfo & {
  loading: boolean;
  error: string;
};

export const useUserInfoStore = defineStore('useInfo', {
  state: (): UserInfoState => ({
    userId: null,
    firstName: null,
    lastName: null,
    userName: null,
    gender: null,
    birthday: null,
    email: null,
    avatarUrl: null,
    createdAt: null,
    role: null,
    loading: false,
    error: ''
  }),

  actions: {
    // 获取用户信息
    async fetchUserInfo(userId: number) {
      if (this.userId && this.userName) return null

      this.loading = true
      this.error = ''

      try {
        const response = await fetchUserInfo(userId)
        const avatarUrl = response.avatarUrl
          ? `http://localhost:8080/${response.avatarUrl.replace(/^\/+/, '')}`
          : null;

        this.$patch({
          ...response,
          avatarUrl
        }
        )
      } catch (error: any) {
        this.error = error.message || 'Loading user info Failed'
        console.error('Loading user info Failed:', this.error)
      } finally {
        this.loading = false
      }
    },

    // 重置用户信息（如登出后）
    reset() {
      this.$reset()
    }
  }
})