import axios from 'axios'
import { urls } from '@/utils/urls.ts'
import type { Category, City, ProviderCard, loginForm, registerForm, AdminAccountForm } from '@/types/types'

//获取categories
export async function fetchCategories(): Promise<Category[]> {
  return (await axios.get<Category[]>(urls.getCategories)).data
}

//获取city
export async function fetchCities(): Promise<City[]> {
  return (await axios.get<City[]>(urls.getCities)).data
}

//login
export async function login( loginForm: loginForm ) {
  const response = await axios.post(urls.login,
    { ...loginForm }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
  return response.data
}
// export async function login(loginForm: loginForm) {
//   const response =  await axios.get(urls.login, {
//     params: loginForm,
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   })
//   const data = response.data
//
//   if (!Array.isArray(data) || data.length === 0) {
//     throw new Error('Invalid email or password')
//   }
//
//   return data[0]
// }


//admin login
export async function adminLogin( adminLoginForm: AdminAccountForm ) {
  const response = await axios.post(urls.adminLogin,
    { ...adminLoginForm }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
  return response.data
}
// export async function adminLogin(adminLoginForm: AdminAccountForm) {
//   const response = await axios.get(urls.adminLogin, {
//     params: adminLoginForm,
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   })
//   const data = response.data
//
//   if (!Array.isArray(data) || data.length === 0) {
//     throw new Error('Invalid email or password')
//   }
//
//   return data
// }



//register
export async function register(registerForm: registerForm) {
  return (await axios.post(urls.register, { ...registerForm }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })).status
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

// 获取某个服务者的详细信息（评分 + 评论）
export async function fetchProviderDetail(providerId: number) {
  const response = await axios.get(urls.getProviderById, {
    params: {
      providerId
    }
  })
  return response.data
}
