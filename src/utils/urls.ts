const BASE_URL = 'http://localhost:3000';

export const urls = {
  // login:'http://localhost:8080/api/auth/login',


  acceptTask: `${BASE_URL}/acceptTask`,
  getChatMessages:(chatId: number) => `${BASE_URL}/chatMessages?chatId=${chatId}`,
  postChatMessages:(chatId: number) => `${BASE_URL}/chatMessages?chatId=${chatId}`,
  getConversations:(userId: number) => `${BASE_URL}/conversations?userId=${userId}`,
  getConversation: `${BASE_URL}/createConversation`,


  getMyTasks:(userId: number) => `${BASE_URL}/myTasks?providerId=${userId}`,
  changeMyTaskStatus:(taskId: number) => `${BASE_URL}/myTasks/${taskId}`,

  getProviderInfo: (userId: number) => `${BASE_URL}/providerInfo?userId=${userId}`,
  updateProviderInfo:(providerId: number) => `${BASE_URL}/providerInfo/${providerId}`,


  //重置完的

  //用户信息相关
  login: `${BASE_URL}/login`,
  register:`${BASE_URL}/register`,

  adminLogin: `${BASE_URL}/login`,
  adminRegister: `${BASE_URL}/login`,


  getUserInfo: (userId: number) => `${BASE_URL}/userInfo?userId=${userId}`,
  updateUserInfo:(userId: number) => `${BASE_URL}/userInfo/${userId}`,
  uploadAvatar:(userId: number) => `${BASE_URL}/userInfo/${userId}`,
  becomeProvider: `${BASE_URL}/becomeProviders`,
  getProvider: `${BASE_URL}/providers`,



  //订单相关
  getTask: `${BASE_URL}/tasks`,
  postTask: `${BASE_URL}/postTask`,

  getMyOrders:(userId: number) => `${BASE_URL}/orders?customerId=${userId}`,
  changeMyOrderStatus:(orderId: number) => `${BASE_URL}/orders/${orderId}`,

  reviewMyOrder:`${BASE_URL}/review`,


  //静态选项
  getCategories: `${BASE_URL}/categories`,
  getCities: `${BASE_URL}/cities`,

  providerApplications: `${BASE_URL}/providerApplications`,
  operateProviderApplications:(applicationId : number) => `${BASE_URL}/providerApplications/${applicationId}`,
  getNotices: `${BASE_URL}/notices`,
  sendNotices: `${BASE_URL}/notices`,

  getInfoMessages: (userId: number) => `${BASE_URL}/infoMessages?userId=${userId}`,
  readInfoMessages:(announceId: number) => `${BASE_URL}/infoMessages/${announceId}`,
}