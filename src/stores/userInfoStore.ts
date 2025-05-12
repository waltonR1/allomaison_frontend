import { defineStore } from 'pinia'
import { fetchUserInfo } from '@/api/withTokenAPI.ts'

export type UserInfo = {
  user_id: string | null;   //后端生成
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  gender: 'male' | 'female' | null;
  birthday: string | null; // 格式为 YYYY-MM-DD
  email: string | null;
  phone: string | null;
  avatarUrl?: string | null; // 用户头像链接
  address?: string | null;
  city?: string | null;
  country?: string | null;
  zipCode?: string | null;
  createdAt?: string | null; // 注册时间   后端生成
  lastLogin?: string | null; // 最近登录时间  后端生成
  role: 'customer' | 'provider' | 'admin' | null;
}

export type UserInfoState = UserInfo & {
  loading: boolean;
  error: string;
};


export const useUserInfoStore = defineStore('useInfo', {
  state: (): UserInfoState => ({
    user_id: null,
    first_name: null,
    last_name: null,
    username: null,
    gender: null,
    birthday: null,
    email: null,
    phone: null,
    avatarUrl: null,
    address: null,
    city: null,
    country: null,
    zipCode: null,
    createdAt: null,
    lastLogin: null,
    role: null,
    loading: false,
    error: ''
  }),

  actions: {
    // 获取用户信息
    async fetchUserInfo(user_id: string) {
      if (this.user_id && this.username) return null

      this.loading = true
      this.error = ''

      try {
        const response = await fetchUserInfo(user_id)
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