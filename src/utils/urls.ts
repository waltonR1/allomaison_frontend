const BASE_URL = 'http://localhost:3000';

export const urls = {
  // login:'http://localhost:8080/api/auth/login',
  login: `${BASE_URL}/user/login`,
  register:`${BASE_URL}/users`,
  becomeProvider: `${BASE_URL}/providers`,
  postTask: `${BASE_URL}/postTask`,
  connectProvider: `${BASE_URL}/connectProvider`,
  connectRequest: `${BASE_URL}/connectRequest`,
}