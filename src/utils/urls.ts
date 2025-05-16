const BASE_URL = 'http://localhost:3000';

export const urls = {
  // login:'http://localhost:8080/api/auth/login',


  connectProvider: `${BASE_URL}/connectProvider`,
  connectTask: `${BASE_URL}/connectTask`,

  //重置完的

  //用户信息相关
  login: `${BASE_URL}/user/login`,
  register:`${BASE_URL}/users`,

  getUserInfo: (userId: number) => `${BASE_URL}/userInfo?user_id=${userId}`,
  updateUserInfo:(userId: number) => `${BASE_URL}/userInfo/${userId}`,
  uploadAvatar:(userId: number) => `${BASE_URL}/userInfo/${userId}`,
  becomeProvider: `${BASE_URL}/becomeProviders`,
  getProvider: `${BASE_URL}/providers`,



  //订单相关
  getTask: `${BASE_URL}/tasks`,
  postTask: `${BASE_URL}/postTask`,

  getOrders:(userId: number) => `${BASE_URL}/orders?customerId=${userId}`,
  concealOrder:(orderId: number) => `${BASE_URL}/orders/${orderId}`,
  restartOrder:(orderId: number) => `${BASE_URL}/orders/${orderId}`,

  reviewOrder:`${BASE_URL}/review`,


  //静态选项
  getCategories: `${BASE_URL}/categories`,
  getCities: `${BASE_URL}/cities`,


}