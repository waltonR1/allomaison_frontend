import { defineStore } from 'pinia'
import { fetchUserInfo } from '@/api/withTokenAPI.ts'
import type { UserInfoState } from '@/types/types'

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
    lastLogin: null,
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
        this.$patch(response[0])
      } catch (error: any) {
        this.error = error.message || '获取用户信息失败'
        console.error('获取用户信息失败:', this.error)
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