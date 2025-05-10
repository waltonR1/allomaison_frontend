interface UserInfo {
  user_id: string;   //后端生成
  first_name: string;
  last_name: string;
  username: string;
  gender: 'male' | 'female';
  birthday: string; // 格式为 YYYY-MM-DD
  email: string;
  phone: string;
  avatarUrl?: string; // 用户头像链接
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  createdAt?: string; // 注册时间   后端生成
  lastLogin?: string; // 最近登录时间  后端生成
  role: 'customer' | 'provider' | 'admin';
}

export const UserInfo: UserInfo = {
  user_id: 'usr_20250510_001',
  first_name: 'Julie',
  last_name: 'Chen',
  username: 'juliechen88',
  gender: 'female',
  birthday: '1995-08-20',
  email: 'julie.chen@example.com',
  phone: '0612345678',
  avatarUrl: 'https://example.com/avatars/julie.jpg',
  address: '12 Rue des Fleurs',
  city: 'Paris',
  country: 'France',
  zipCode: '75008',
  createdAt: '2024-11-15T10:24:00Z',
  lastLogin: '2025-05-10T08:12:00Z',
  role: 'customer'
}
