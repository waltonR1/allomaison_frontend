import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.ts'
import { useAdminStore } from '@/stores/adminStore.ts'
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
  AdminAccountForm, TaskCard
} from '@/types/types'


// 提交成为provider的申请
export async function submitProviderApplication(userId: number, form: Omit<ProviderApplicationForm,'customerId'>) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  const formData = new FormData()
  formData.append('userId', userId.toString())
  formData.append('city', form.zipcode)
  formData.append('category', form.categories)
  formData.append('description', form.experiences)
  form.certifications.forEach(file => formData.append('certificates', file)) // 后端用 List<MultipartFile>
  return await axios.post(urls.becomeProvider, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token.value}`
    },
  })
}

// 发布Task
export async function postTask (form: TaskForm) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)

  console.log({...form})

  return await axios.post(urls.postTask, {...form}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })
}

// 遍历order
export async function fetchOrders(): Promise<MyOrderCard[]> {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  const response = await axios.get<MyOrderCard[]>((urls.getMyOrders),{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })

  return response.data.map(order => ({
    ...order,
    orderId: order.taskId
  }))
}

// 改变order状态
export async function cancelOrder(orderId:number) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  console.log(orderId)

  const response = await axios.post(urls.cancelMyOrder,{taskId: orderId},{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })
  return response
}

//评论order
export async function reviewOrder(orderId: number, reviewText:string, rating: number) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return await axios.post(urls.reviewMyOrder,{orderId: orderId, comment: reviewText, rating: rating},{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })
}

//获取用户信息
export async function fetchUserInfo(userId:number): Promise<UserInfo> {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return (await axios.get<UserInfo>(urls.getUserInfo,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })).data
}

//更新头像
export async function uploadAvatar(userId:number ,file:File){
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await axios.post(urls.uploadAvatar(userId), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token.value}`
    },
  }).catch(error => {console.log(error)})
  console.log(response)
  return response
}

//更新个人信息
export async function updateUserInfo(form: string) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return await axios.post(urls.updateUserInfo, {newUserName: form} , {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })
}


// ========== Conversations ========== //
export async function fetchConversations(userId:number): Promise<Conversation[]> {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  console.log(token.value)
  const response = await axios.get<Conversation[]>(urls.getConversations,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })
  console.log(response.data)
  return response.data
}

// ========== Messages ========== //
export async function fetchMessages(chatId: number): Promise<Message[]> {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return (await axios.get<Message[]>(urls.getChatMessages(chatId),{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })).data
}

export async function postMessage(chatId: number, senderId: number, content: string, createdAt: Date) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return await axios.post(urls.postChatMessages, { senderId: senderId, content: content, createdAt: createdAt },{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'chatId': chatId.toString(),
      'Authorization': `Bearer ${token.value}`
    },
  })
}

export async function getConversation(userId: number, contactId: number) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return await axios.post(urls.getConversation, {senderId: userId, receiverId: contactId, content: "Hi"},{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })
}


export async function acceptTask(taskId: number, providerId: number) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return await axios.post(urls.acceptTask(taskId), {}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    } }
  )
}




// 遍历task
export async function fetchTasks(providerId:number): Promise<MyTaskCard[]> {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return (await axios.get<MyTaskCard[]>(urls.getMyTasks,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })).data
}

// 改变order状态
export async function changeTaskStatus(taskId:number,status:string) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return await axios.patch(urls.changeMyTaskStatus,{orderId: taskId, status: status },{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })
}

//获取provider个人信息
export async function fetchProviderInfo(userId:number): Promise<ProviderInfo> {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return (await axios.get<ProviderInfo>(urls.getProviderInfo,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })).data
}

//更新provider信息
export async function updateProviderInfo(providerId: number, form: Partial<ProviderInfo>) {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return await axios.patch(urls.updateProviderInfo, form, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })
}

// 获取通知列表
export async function fetchInfoMessages(): Promise<InfoMessage[]> {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  return (await axios.get<InfoMessage[]>(urls.getInfoMessages,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })).data
}

// 获取所有provider申请
export async function fetchProviderApplications(): Promise<AdminProviderApplication[]> {
  const adminStore = useAdminStore()
  const { token } = storeToRefs(adminStore)
  const response = await axios.get<AdminProviderApplication[]>(urls.providerApplications,  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })

  const baseUrl = 'http://localhost:8080'
  return response.data.map(p => ({
    ...p,
    categories: p.category,
    experiences: p.description,
    certifications: p.certifications.map(filePath => ({
      fileUrl: `${baseUrl}${filePath}`
    }))
  }))
}

export async function reviewProviderApplication(applicationId: number, status: string): Promise<any> {
  const adminStore = useAdminStore()
  const { token } = storeToRefs(adminStore)
  const response = await axios.post(urls.operateProviderApplications(applicationId,status), {}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })

  return response
}

//获取通知
export async function fetchNotices(): Promise<Notice[]> {
  const adminStore = useAdminStore()
  const { token } = storeToRefs(adminStore)
  return (await axios.get<Notice[]>(urls.getNotices,  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })).data
}

//发送通知
export async function createNotice(notice: Omit<Notice, 'NoticeId' | 'sentTime'>, createdAt: Date): Promise<any> {
  const adminStore = useAdminStore()
  const { token } = storeToRefs(adminStore)
  console.log(notice)
  console.log(token.value)
  return await axios.post(urls.sendNotices, {...notice,targets: notice.type.toUpperCase(), type: "NOTICE", sentTime: createdAt }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })
}

export async function createAdminAccount(adminInfo:AdminAccountForm): Promise<any> {
  const adminStore = useAdminStore()
  const { token } = storeToRefs(adminStore)
  return await axios.post(urls.adminRegister, {...adminInfo, rawPassword:adminInfo.password}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`
    },
  })
}

// 遍历task
export async function fetchTasksWithoutId(): Promise<TaskCard[]> {
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  const response = await axios.get<TaskCard[]>(urls.getTask,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`
    }
  })
  return response.data.map(p => ({
    ...p,
    taskId: Number(p.taskId),
    customerId: Number(p.customerId),
  }))
}






