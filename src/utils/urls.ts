const BASE_URL = 'http://localhost:3000';

export const urls = {
  // login:'http://localhost:8080/api/auth/login',
  login: `${BASE_URL}/user/login`,
  register:`${BASE_URL}/users`,
  becomeProvider: `${BASE_URL}/providers`,
  postRequest: `${BASE_URL}/postRequest`,
  connectService: `${BASE_URL}/connectService`,
  connectRequest: `${BASE_URL}/connectRequest`,
}