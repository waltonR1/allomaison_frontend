import { defineStore } from 'pinia'
import { cancelOrder, fetchOrders, reviewOrder } from '@/api/withTokenAPI.ts'
import type { MyOrderCard } from '@/types/types'

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
    async fetchOrders(force = false) {
      if (this.orderCards.length > 0 && !force) return;

      try {
        this.loading = true
        this.orderCards = await fetchOrders()
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
        const response = await cancelOrder(orderId)
        if (response.status === 200) {
          const order = this.orderCards.find((o) => o.orderId === orderId)
          if (order) {
            order.status = 'CANCELLED'
          }
        }
      } catch (e: any) {
        this.error = e.message || 'Conceal Failed'
      }
    },

    async review(orderId: number, reviewText: string, rating: number) {
      try {
        await reviewOrder(orderId, reviewText,rating)
      }catch (e:any){
        this.error = e.message || 'Review Failed'
      }
    }

  }
})
