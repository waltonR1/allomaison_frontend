import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import type { ProviderApplicationForm } from '@/views/BecomeProvider.vue'
import type { TaskForm } from '@/views/PostTask.vue'
import type { Order } from '@/stores/orderStore.ts'
import type { UserInfo } from '@/stores/userInfoStore.ts'


// 提交成为provider的申请
export async function submitProviderApplication(userId: number, form: ProviderApplicationForm) {
  const formData = new FormData()
  formData.append('customerId', userId.toString())
  formData.append('idNumber', form.idNumber)
  formData.append('yearsOfService', form.yearsOfService)
  formData.append('city', form.city)
  formData.append('categories', form.categories)
  formData.append('experiences', form.experiences)
  form.certifications.forEach(file => formData.append('certifications', file)) // 后端用 List<MultipartFile>

  return await axios.post(urls.becomeProvider, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 发布Task
export async function postTask (userId: Number, form: TaskForm) {
  await axios.post(urls.postTask, {userId: userId, providerId: -1, ...form}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });
}

// 遍历order
export async function fetchOrders(customerId:number): Promise<Order[]> {
  const response = await axios.get<Order[]>(urls.getOrders(customerId))
  return response.data
}

//获取用户信息
export async function fetchUserInfo(userId:number): Promise<UserInfo[]> {
  const response = await axios.get<UserInfo[]>(urls.getUserInfo(userId))
  return response.data
}

//更新头像
export async function uploadAvatar(userId:number ,file:File){
  const formData = new FormData()
  formData.append('avatar', file)

  return await axios.post(urls.uploadAvatar(userId), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

//更新个人信息
export async function updateUserInfo(userId: number, form: Partial<UserInfo>) {
  return await axios.put(urls.updateUserInfo(userId), form, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}





