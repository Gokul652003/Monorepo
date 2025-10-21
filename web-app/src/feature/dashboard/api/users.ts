
import api from '@/lib/api-client';
import type { UserDetails } from '../type/user-details';

export const getUsersList = async (): Promise<UserDetails[]> => {
  const response = await api.post('/users');

  return response.data.map( (user:any) => ({
    userId: user.user_id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    isBlocked: user.isBlocked,
  }));
};

export const blockUserApi = async ( userId : string) => {
  await api.post(`/users/block-user/${userId}`);
};

export const unblockUserApi = async ( userId :string) => {
  await api.post(`/users/unblock-user/${userId}`);
};
