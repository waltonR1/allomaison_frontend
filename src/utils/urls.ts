const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'http://localhost:3000';

export const urls = {
  acceptTask:(taskId:number) => `${BASE_URL}/api/orders/accept?taskId=${taskId}`,
  getChatMessages:(chatId: number) => `${BASE_URL}/api/chat-messages?chatId=${chatId}`,
  postChatMessages:`${BASE_URL}/api/chat-messages`,
  getConversations: `${BASE_URL}/api/conversations`,
  getConversation: `${BASE_URL}/api/conversations`,


  getMyTasks:`${BASE_URL}/api/orders/my`,
  changeMyTaskStatus: `${BASE_URL}/api/order/change-status`,

  getProviderInfo: `${BASE_URL}/api/provider/me`,
  updateProviderInfo: `${BASE_URL}/api/provider/me`,

  //用户信息相关
  login: `${BASE_URL}/api/login`,
  // login: `${BASE_URL}/login`,
  register:`${BASE_URL}/api/register`,

  adminLogin: `${BASE_URL}/admin/login`,
  adminRegister: `${BASE_URL}/admin/register`,


  getUserInfo: `${BASE_URL}/api/user/me`,
  updateUserInfo:`${BASE_URL}/api/user/update-username`,
  uploadAvatar:(userId: number) => `${BASE_URL}/api/userInfo/${userId}`,
  becomeProvider: `${BASE_URL}/api/provider/apply`,
  getProvider: `${BASE_URL}/api/providers`,
  getProviderById: `${BASE_URL}/api/review-summary`,



  //订单相关
  getTask: `${BASE_URL}/api/tasks`,
  postTask: `${BASE_URL}/api/post-task`,

  getMyOrders: `${BASE_URL}/api/tasks/my`,
  cancelMyOrder:`${BASE_URL}/api/task/cancel`,

  reviewMyOrder:`${BASE_URL}/api/review`,


  //静态选项
  getCategories: `${BASE_URL}/api/categories`,
  getCities: `${BASE_URL}/api/cities`,

  providerApplications: `${BASE_URL}/admin/applications`,
  operateProviderApplications:(applicationId : number, status: string) => `${BASE_URL}/admin/applications/${applicationId}/review?action=${status}`,
  getNotices: `${BASE_URL}/admin/notices/global`,
  sendNotices: `${BASE_URL}/admin/notices`,

  getInfoMessages:`${BASE_URL}/api/notices`,
}