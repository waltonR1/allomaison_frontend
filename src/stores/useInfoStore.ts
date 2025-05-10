import {defineStore} from 'pinia'
import axios from 'axios'
import { urls } from '@/utils/urls.ts'

export interface UserInfo {
  user_id: string;   //后端生成
  first_name: string;
  last_name: string;
  username: string;
  gender: 'male' | 'female';
  birthday: string; // 格式为 YYYY-MM-DD
  email: string;
  phone: string;
  avatarUrl?: string; // 用户头像链接
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  createdAt?: string; // 注册时间   后端生成
  lastLogin?: string; // 最近登录时间  后端生成
  role: 'customer' | 'provider' | 'admin';
}

export const useUserInfoStore = defineStore('useInfo', {
  state: (): UserInfo =>({
    user_id: '',
    first_name: '',
    last_name: '',
    username: '',
    gender: 'male',
    birthday: '',
    email: '',
    phone: '',
    avatarUrl: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    createdAt: '',
    lastLogin: '',
    role: 'customer',
  }),
  actions: {
    async fetchUserInfo() {

        if (this.user_id) return;

        try {
          const response = await axios.get(urls.getUserInfo)
          this.$patch(response.data)
        }catch (error: any) {
          console.error('获取用户信息失败:', error.message)
        }
    }
  }
})