import { defineStore } from 'pinia';
import { login } from '@/api/noTokenAPI.ts'

type UserState = {
  token: string | null;
  role: 'customer' | 'provider' | 'admin' | null;
  user_id: string | null;
  avatarUrl: string | null;
  username: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: 'ww',
    role: 'customer',
    user_id:'usr_20250510_001',
    avatarUrl:'/1',
    username:'binbin'
  }),

  getters: {
    isLoggedIn: (state) => !!state.token
  },

  actions: {
    async login(values: { email: string; password: string }) {
      try {
        const response = await login(values);

        this.token = response.data.token;
        this.role = response.data.role;
        this.user_id = response.data.id;
        this.avatarUrl = response.data.avatarUrl;
        this.username = response.data.username;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || error.response?.data || 'Login failed');
      }
    },
    logout() {
      this.token = null;
      this.role = null;
      this.user_id = null;
      this.avatarUrl = null;
      this.username = null;
    },
    /** 判断本地 token 是否仍然有效；无效就自动登出 */
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