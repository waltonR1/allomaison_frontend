import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import type { ProviderApplicationForm } from '@/views/ProviderBecome.vue'
import type { TaskForm } from '@/views/TaskPost.vue'
import type { MyOrderCard } from '@/stores/myOrderStore.ts'
import type { UserInfo } from '@/stores/userInfoStore.ts'
import type { MyTaskCard } from '@/stores/myTaskStore.ts'
import type { ProviderInfo } from '@/stores/providerInfoStore.ts'


// 提交成为provider的申请
export async function submitProviderApplication(userId: number, form: ProviderApplicationForm) {
  const formData = new FormData()
  formData.append('customerId', userId.toString())
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
export async function postTask (userId: number, form: TaskForm) {
  return await axios.post(urls.postTask, {userId: userId, providerId: -1, ...form}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}

// 遍历order
export async function fetchOrders(customerId:number): Promise<MyOrderCard[]> {
  const response = await axios.get<MyOrderCard[]>(urls.getMyOrders(customerId))
  return response.data
}

// 改变order状态
export async function changeOrderStatus(orderId:number,status:string) {
  return await axios.patch(urls.changeMyOrderStatus(orderId),{ status: status },{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}

//评论order
export async function reviewOrder(orderId: number, reviewText:string) {
  return await axios.post(urls.reviewMyOrder,{orderId, reviewText},{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
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
  return await axios.patch(urls.updateUserInfo(userId), form, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}


// ========== Conversations ========== //
export async function fetchConversations(userId:number) {
  return await axios.get(urls.getConversations(userId))
}

// ========== Messages ========== //
export async function fetchMessages(chatId: number) {
  return await axios.get(urls.chatMessages(chatId))
}

export async function postMessage(chatId: number, senderId: number, content: string, createdAt: Date) {
  return await axios.post(urls.chatMessages(chatId), {chatId, senderId, content, createdAt },)
}

export async function getConversation(userId: number, contactId: number) {
  return await axios.post(urls.getConversation, {userId, contactId },)
}

export async function acceptTask(taskId: number, providerId: number) {
  return await axios.post(urls.acceptTask, { taskId: taskId, providerId: providerId },
    { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
  )
}




// 遍历task
export async function fetchTasks(providerId:number): Promise<MyTaskCard[]> {
  const response = await axios.get<MyTaskCard[]>(urls.getMyTasks(providerId))
  return response.data
}

// 改变order状态
export async function changeTaskStatus(taskId:number,status:string) {
  return await axios.patch(urls.changeMyTaskStatus(taskId),{ status: status },{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}


//获取provider个人信息
export async function fetchProviderInfo(userId:number): Promise<ProviderInfo[]> {
  const response = await axios.get<ProviderInfo[]>(urls.getProviderInfo(userId))
  return response.data
}

//更新provider信息
export async function updateProviderInfo(providerId: number, form: Partial<ProviderInfo>) {
  return await axios.patch(urls.updateProviderInfo(providerId), form, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}






