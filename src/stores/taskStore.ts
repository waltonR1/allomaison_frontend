import { defineStore } from 'pinia'
import { fetchTasksWithoutId } from '@/api/withTokenAPI.ts'
import type { TaskCard } from '@/types/types'

type TaskState = {
  taskCards: TaskCard[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

export const useTaskStore = defineStore('tasks', {
  state: ():TaskState => ({
    taskCards: [],
    loading: false,
    error: null,
    fetched: false,
  }),

  getters: {
    /** 根据 TaskId 获取单个服务者 */
    getById: (state) => (taskId: number): TaskCard | undefined =>
      state.taskCards.find((p) => p.taskId === taskId),
  },

  actions: {
    /** 从后端获取全部服务者列表（默认只在第一次调用时请求，可用 force=true 强制刷新） */
    async fetchTasks(force = false): Promise<void> {
      if (this.taskCards.length > 0 && !force) return;

      this.loading = true;
      try {
        this.taskCards = await fetchTasksWithoutId();
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