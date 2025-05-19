import { defineStore } from 'pinia'
import { changeTaskStatus, fetchTasks } from '@/api/withTokenAPI.ts'

export type MyTaskCard = {
  taskId: number
  providerId: number
  customerName: string
  customerId: number
  category: string
  datetime: string
  address: string
  description: string
  title:string
  frequency: string
  city: string
  budget: string
  customerContact: string
  status: 'Confirmed' | 'Completed' | 'Cancelled'
  createdAt: string
}

type MyTaskState = {
  taskCards: MyTaskCard[]
  loading: boolean
  error: string | null
  fetched: boolean
}

export const useMyTaskStore = defineStore('myTaskStore', {
  state: (): MyTaskState => ({
    taskCards: [],
    loading: false,
    error: '',
    fetched: false
  }),

  getters: {
    /** 根据 TaskId 获取单个task */
    getById: (state) => (taskId: number): MyTaskCard | undefined =>
      state.taskCards.find((p) => p.taskId === taskId),
  },

  actions: {
    async fetchTasks(customerId: number, force = false) {
      if (this.taskCards.length > 0 && !force) return;

      try {
        this.loading = true
        this.taskCards = await fetchTasks(customerId)
        this.error = null
        this.fetched = true
      } catch (e: any) {
        this.error = e.message || 'Loading Failed'
      } finally {
        this.loading = false
      }
    },

    async conceal(taskId: number) {
      try {
        const response = await changeTaskStatus(taskId,'Cancelled')
        if (response.status === 200) {
          const task = this.taskCards.find((o) => o.taskId === taskId)
          if (task) {
            task.status = 'Cancelled'
          }
        }
      } catch (e: any) {
        this.error = e.message || 'Conceal Failed'
      }
    },

  }
})
