import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import type { Category, City, TaskCard, ProviderCard, loginForm, registerForm } from '@/types/types'

//获取categories
export async function fetchCategories(): Promise<Category[]> {
  return (await axios.get<Category[]>(urls.getCategories)).data
}

//获取city
export async function fetchCities(): Promise<City[]> {
  return (await axios.get<City[]>(urls.getCities)).data
}

//login
// export async function login( loginForm: loginForm ) {
//   return await axios.post(urls.login,
//     { ...loginForm }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//     })
// }
export async function login(loginForm: loginForm) {
  const response =  await axios.get(urls.login, {
    params: loginForm,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  const data = response.data

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid email or password')
  }

  return data
}


//admin login
// export async function adminLogin( loginForm: loginForm ) {
//   return await axios.post(urls.adminLogin,
//     { ...loginForm }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//     })
// }
export async function adminLogin(loginForm: loginForm) {
  const response =  await axios.get(urls.adminLogin, {
    params: loginForm,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  const data = response.data

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid email or password')
  }

  return data
}



//register
export async function register(registerForm: registerForm) {
  await axios.post(urls.register,{...registerForm},{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}

// 遍历provider
export async function fetchProviders(): Promise<ProviderCard[]> {
  const response = await axios.get<ProviderCard[]>(urls.getProvider)
  return response.data.map(p => ({
    ...p,
    providerId: Number(p.providerId),
    rating: Number(p.rating),
  }))
}

// 遍历task
export async function fetchTasks(): Promise<TaskCard[]> {
  const response = await axios.get<TaskCard[]>(urls.getTask)
  return response.data.map(p => ({
    ...p,
    taskId: Number(p.taskId),
    customerId: Number(p.customerId),
  }))
}
