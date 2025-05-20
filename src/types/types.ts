// 所有全局类型定义集中于此文件，便于统一管理和复用
export type InfoMessage = {
  announceId: number
  userId: number
  title?: string
  content: string
  type: string
  sentTime: string
  read: boolean
}

export type loginForm ={
  email: string,
  password: string,
}

export type TaskCard = {
  taskId: number
  customerId: number
  title: string
  category: string
  frequency: string
  city: string
  startTime: string
  endTime: string
  address: string
  budget: string
  customerContact: string
  description: string
  createdAt: string
}

export type ProviderCard = {
  providerId: number
  category: string
  city: string
  providerName: string
  description: string
  rating: number
  avatarUrl: string
  servicesOffered: string[]
  serviceArea: string
  availabilityTime: string
  customerReview: {
    author: string
    content: string
  }[]
  providerLabels: []
  priceRange: string
}

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

export type City = {
  city: string
  zipcode: string
}

export type ProviderApplicationForm = {
  city: string
  categories: string
  experiences: string
  certifications: File[]
}

export type MyTaskCard = {
  taskId: number
  providerId: number
  customerName: string
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
  customerContact: string
  status: 'Confirmed' | 'Completed' | 'Cancelled'
  createdAt: string
}

export type UserInfo = {
  userId: number | null;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  gender: 'male' | 'female' | null;
  birthday: string | null;
  email: string | null;
  avatarUrl: string | null;
  createdAt: string | null;
  lastLogin: string | null;
  role: 'customer' | 'provider' | 'admin' | null;
}

export type ProviderInfo = {
  userId: number | null
  providerId: number | null
  category: string
  city: string
  providerName: string
  description: string
  servicesOffered: string[]
  serviceArea: string
  availabilityTime: string
  providerLabels: string[]
  priceRange: string
}

export type Category = {
  category: string
}

export type TaskForm = {
  title: string,
  category: string,
  frequency: string,
  city: string,
  startTime: string,
  endTime: string,
  address: string,
  budget:string,
  customerContact:string,
  description: string
}

export type registerForm = {
  firstName: string,
  lastName:string,
  userName: string,
  gender:string,
  birthday:string,
  email: string,
  password: string,
  confirmPassword: string,
  agree: boolean,
}

export type Conversation  = {
  chatId: number
  ContactName: string
  lastMessage: string
  updatedAt: string
}

export type Message  = {
  msgId: number
  senderId: number
  content: string
  createdAt: string
}