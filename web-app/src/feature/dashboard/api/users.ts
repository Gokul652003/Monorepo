import api from '@/lib/api-client';
import type { UserDetails } from '../type/user-details';
import { apiPaths } from '@/config/api-paths';

export const getUsersList = async (): Promise<UserDetails[]> => {
  const response = await api.post(apiPaths.usersList());

  return response.data.map((user: any) => ({
    userId: user.user_id,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    isBlocked: user.isBlocked,
  }));
};

export const blockUserApi = async (userId: string) => {
  await api.post(apiPaths.blockUser(userId));
};

export const unblockUserApi = async (userId: string) => {
  await api.post(apiPaths.unBlockUser(userId));
};
