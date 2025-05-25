import axios from '@/utils/axios'
import { urls } from '@/utils/urls.ts'
import type {
  ProviderApplicationForm,
  TaskForm,
  MyOrderCard,
  UserInfo,
  MyTaskCard,
  ProviderInfo,
  Message,
  Conversation,
  Notice,
  AdminProviderApplication,
  InfoMessage,
  AdminAccountForm
} from '@/types/types'


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
  return (await axios.get<MyOrderCard[]>(urls.getMyOrders(customerId))).data
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
export async function reviewOrder(orderId: number, reviewText:string, rating: number) {
  return await axios.post(urls.reviewMyOrder,{orderId: orderId, reviewText: reviewText, rating: rating},{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}

//获取用户信息
export async function fetchUserInfo(userId:number): Promise<UserInfo[]> {
  return (await axios.get<UserInfo[]>(urls.getUserInfo(userId))).data
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
export async function fetchConversations(userId:number): Promise<Conversation[]> {
  return (await axios.get<Conversation[]>(urls.getConversations(userId))).data
}

// ========== Messages ========== //
export async function fetchMessages(chatId: number): Promise<Message[]> {
  return (await axios.get<Message[]>(urls.getChatMessages(chatId))).data
}

export async function postMessage(chatId: number, senderId: number, content: string, createdAt: Date) {
  return await axios.post(urls.postChatMessages(chatId), {chatId: chatId, senderId: senderId, content: content, createdAt: createdAt },)
}

export async function getConversation(userId: number, contactId: number) {
  return await axios.post(urls.getConversation, {userId: userId, contactId: contactId },)
}


export async function acceptTask(taskId: number, providerId: number) {
  return await axios.post(urls.acceptTask, { taskId: taskId, providerId: providerId },
    { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
  )
}




// 遍历task
export async function fetchTasks(providerId:number): Promise<MyTaskCard[]> {
  return (await axios.get<MyTaskCard[]>(urls.getMyTasks(providerId))).data
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
  return (await axios.get<ProviderInfo[]>(urls.getProviderInfo(userId))).data
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






// 获取通知列表
export async function fetchInfoMessages(userId: number): Promise<InfoMessage[]> {
  return (await axios.get<InfoMessage[]>(urls.getInfoMessages(userId))).data
}



// 更新通知已读状态
export async function markInfoMessageAsRead(announceId: number) {
  return await axios.patch(urls.readInfoMessages(announceId), { read: true }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}



// 获取所有provider申请
export async function fetchProviderApplications(): Promise<AdminProviderApplication[]> {
  return (await axios.get<AdminProviderApplication[]>(urls.providerApplications)).data
}

export async function reviewProviderApplication(applicationId: number, status: string): Promise<any> {
  return await axios.patch(urls.operateProviderApplications(applicationId), { status }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}

//获取通知
export async function fetchNotices(): Promise<Notice[]> {
  return (await axios.get<Notice[]>(urls.getNotices)).data
}

//发送通知
export async function createNotice(notice: Omit<Notice, 'NoticeId' | 'sentTime'>, createdAt: Date): Promise<any> {
  return await axios.post(urls.sendNotices, {...notice, sentTime: createdAt }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}

export async function createAdminAccount(adminInfo:AdminAccountForm): Promise<any> {
  return await axios.post(urls.adminRegister, adminInfo, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}






