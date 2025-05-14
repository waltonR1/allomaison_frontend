import { defineStore } from 'pinia'
import { fetchOrders } from '@/api/withTokenAPI.ts'

export type Order = {
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
  contact: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

type OrderState = {
  orders: Order[]
  loading: boolean
  error: string
}

export const useOrderStore = defineStore('orderStore', {
  state: (): OrderState => ({
    orders: [],
    loading: false,
    error: ''
  }),

  actions: {
    async fetchOrders(customerId: number , force = false) {
      if (this.orders.length > 0 && !force) return;

      try {
        this.loading = true
        this.orders = await fetchOrders(customerId)
      } catch (e: any) {
        this.error = e.message || 'Loading Failed'
      } finally {
        this.loading = false
      }
    }
  }
})
