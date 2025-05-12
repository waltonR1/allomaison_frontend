import { defineStore } from 'pinia'
import { fetchTasks } from '@/api/noTokenAPI.ts'

export type TaskCard = {
  id: number
  userId: string
  title: string
  category: string
  frequency: string
  city: string
  datetime: string
  address: string
  budget: string
  contact: string
  description: string
  createdAt: string
}

type TasksState = {
  taskCards: TaskCard[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

export const useTasksStore = defineStore('tasks', {
  state: ():TasksState => ({
    taskCards: [],
    loading: false,
    error: null,
    fetched: false,
  }),

  getters: {
    /** 根据 ID 获取单个服务者 */
    getById: (state) => (id: number): TaskCard | undefined =>
      state.taskCards.find((p) => p.id === id),
  },

  actions: {
    /** 从后端获取全部服务者列表（默认只在第一次调用时请求，可用 force=true 强制刷新） */
    async fetchTasks(force = false): Promise<void> {
      if (this.taskCards.length > 0 && !force) return;

      this.loading = true;
      try {
        this.taskCards = await fetchTasks();
        this.error = null;
        this.fetched = true;
      } catch (error: any) {
        console.error('failed:', error);
        this.error = error?.message ?? 'failed to load tasks';
      } finally {
        this.loading = false;
      }
    },
  },
})