import { defineStore } from 'pinia';
import {urls} from '@/utils/urls.ts'
import axios from 'axios';
import { toRef } from 'vue'

interface UserState {
  token: string | null;
  // customer/provider
  role: string | null;
  user_id: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: 'ww',
    role: 'customer',
    // role: 'provider'
    user_id:''
  }),
  actions: {
    async login(values: { email: string; password: string }) {
      try {
        const response = await axios.post(urls.login,
          { ...values ,userType: 'user'}, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });

        this.token = response.data.token;
        this.role = response.data.role;
        this.user_id = response.data.id;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Login failed');
      }
    },
    logout() {
      this.token = null;
      this.role = null;
      this.user_id = null;
    },
    /** 判断本地 token 是否仍然有效；无效就自动登出 */
    checkToken() {
      return toRef(this, 'token');
    }
    // async checkToken(): Promise<boolean> {
    //   if (!this.token) return false;           // 本地连 token 都没有
    //
    //   try {
    //     // 1) 向后端请求一个专门的“自检”接口，
    //     //    也有人直接用 /me、/profile 之类的接口
    //     const { data } = await axios.get(urls.validate, {
    //       headers: { Authorization: `Bearer ${this.token}` },
    //       withCredentials: true,
    //     });
    //
    //     // 2) 后端返回用户信息，顺便同步最新角色等
    //     this.role = data.role;
    //     return true;
    //   } catch (err: any) {
    //     // token 过期 / 被吊销 / 无效 → 统一登出
    //     this.logout();
    //     return false;
    //   }
    // },
  },
  // persist: true
});