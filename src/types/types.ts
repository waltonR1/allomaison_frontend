// 所有全局类型定义集中于此文件，便于统一管理和复用

export type UserState = {
  token: string | null;
  role: 'customer' | 'provider' | 'admin' | null;
  userId: number | null;
  avatarUrl: string | null;
  userName: string | null;
}

export type ThemeState = {
  isDark: boolean,
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

export type TaskState = {
  taskCards: TaskCard[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
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

export type ProvidersState = {
  providerCards: ProviderCard[]
  loading: boolean
  error: string | null
  fetched: boolean
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

export type MyOrderState = {
  orderCards: MyOrderCard[]
  loading: boolean
  error: string | null
  fetched: boolean
}

export type City = {
  city: string
  zipcode: string
}

export type CityState = {
  cities: City[],
  loading: boolean,
  error: string
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

export type MyTaskState = {
  taskCards: MyTaskCard[]
  loading: boolean
  error: string | null
  fetched: boolean
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

export type UserInfoState = UserInfo & {
  loading: boolean;
  error: string;
};

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

export type ProviderInfoState = ProviderInfo & {
  loading: boolean;
  error: string;
};

export type Category = {
  category: string
}

export type CategoriesState = {
  categories: Category[]
  loading: boolean
  error: string
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