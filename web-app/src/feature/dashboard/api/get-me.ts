import api from '@/lib/api-client';

export interface DashboardUser {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  isBlocked: boolean|undefined;
}

export const getUserDetails = async (): Promise<DashboardUser> => {
  const { data } = await api.get('users/me'); 
  return data;
};
