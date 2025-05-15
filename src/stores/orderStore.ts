import { defineStore } from 'pinia'
import { concealOrder, fetchOrders, restartOrder } from '@/api/withTokenAPI.ts'

export type OrderCard = {
  orderId: number
  providerId: number
  providerName: string
  customerId: number
  category: string
  datetime: string
  address: string
  description: string
  title:string
  frequency: string
  city: string
  budget: string
  providerContact: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  createdAt: string
}

type OrderState = {
  orderCards: OrderCard[]
  loading: boolean
  error: string | null
  fetched: boolean
}

export const useOrderStore = defineStore('orderStore', {
  state: (): OrderState => ({
    orderCards: [],
    loading: false,
    error: '',
    fetched: false
  }),

  getters: {
    /** 根据 OrderId 获取单个order */
    getById: (state) => (orderId: number): OrderCard | undefined =>
      state.orderCards.find((p) => p.orderId === orderId),
  },

  actions: {
    async fetchOrders(customerId: number , force = false) {
      if (this.orderCards.length > 0 && !force) return;

      try {
        this.loading = true
        this.orderCards = await fetchOrders(customerId)
        this.error = null
        this.fetched = true
      } catch (e: any) {
        this.error = e.message || 'Loading Failed'
      } finally {
        this.loading = false
      }
    },

    async conceal(orderId: number) {
      try {
        const response = await concealOrder(orderId)
        if (response.status === 200) {
          const order = this.orderCards.find((o) => o.orderId === orderId)
          if (order) {
            order.status = 'Cancelled'
          }
        }
      }catch(e:any){
        this.error = e.message || 'Conceal Failed'
      }
    },

    async restart(orderId: number) {
      try {
        const response = await restartOrder(orderId)
        if (response.status === 200) {
          const order = this.orderCards.find((o) => o.orderId === orderId)
          if (order) {
            order.status = 'Pending'
          }
        }
      }catch(e:any){
        this.error = e.message || 'Conceal Failed'
      }
    }
  }
})
