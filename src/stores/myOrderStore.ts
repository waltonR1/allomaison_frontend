import { defineStore } from 'pinia'
import { changeOrderStatus, fetchOrders, reviewOrder } from '@/api/withTokenAPI.ts'

export type MyOrderCard = {
  orderId: number
  providerId: number
  providerName: string
  customerId: number
  category: string
  startTime: string
  endTime: string
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

type MyOrderState = {
  orderCards: MyOrderCard[]
  loading: boolean
  error: string | null
  fetched: boolean
}

export const useMyOrderStore = defineStore('myOrderStore', {
  state: (): MyOrderState => ({
    orderCards: [],
    loading: false,
    error: '',
    fetched: false
  }),

  getters: {
    /** 根据 OrderId 获取单个order */
    getById: (state) => (orderId: number): MyOrderCard | undefined =>
      state.orderCards.find((p) => p.orderId === orderId),
  },

  actions: {
    async fetchOrders(customerId: number, force = false) {
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
        const response = await changeOrderStatus(orderId,'Cancelled')
        if (response.status === 200) {
          const order = this.orderCards.find((o) => o.orderId === orderId)
          if (order) {
            order.status = 'Cancelled'
          }
        }
      } catch (e: any) {
        this.error = e.message || 'Conceal Failed'
      }
    },

    async restart(orderId: number) {
      try {
        const response = await changeOrderStatus(orderId,'Pending')
        if (response.status === 200) {
          const order = this.orderCards.find((o) => o.orderId === orderId)
          if (order) {
            order.status = 'Pending'
          }
        }
      } catch (e: any) {
        this.error = e.message || 'Conceal Failed'
      }
    },

    async review(orderId: number, reviewText: string) {
      try {
        await reviewOrder(orderId, reviewText)
      }catch (e:any){
        this.error = e.message || 'Review Failed'
      }
    }

  }
})
