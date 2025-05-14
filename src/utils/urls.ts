const BASE_URL = 'http://localhost:3000';

export const urls = {
  // login:'http://localhost:8080/api/auth/login',


  connectProvider: `${BASE_URL}/connectProvider`,
  connectTask: `${BASE_URL}/connectTask`,

  //重置完的

  //用户信息相关
  login: `${BASE_URL}/user/login`,
  register:`${BASE_URL}/users`,

  getUserInfo: (user_id: Number) => `${BASE_URL}/userInfo?user_id=${user_id}`,
  updateUserInfo:(user_id: Number) => `${BASE_URL}/userInfo/${user_id}`,
  uploadAvatar:(user_id: Number) => `${BASE_URL}/userInfo/${user_id}`,
  becomeProvider: `${BASE_URL}/becomeProviders`,
  getProvider: `${BASE_URL}/providers`,



  //订单相关
  getTask: `${BASE_URL}/tasks`,
  postTask: `${BASE_URL}/postTask`,

  getOrders:(user_id: Number) => `${BASE_URL}/orders?customerId=${user_id}`,

  //静态选项
  getCategories: `${BASE_URL}/categories`,
  getCities: `${BASE_URL}/cities`,


}