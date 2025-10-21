import api from '@/lib/api-client';
import type { UserDetails } from '../type/user-details';
import { apiPaths } from '@/config/api-paths';

export const getUserDetails = async (): Promise<UserDetails> => {
  const { data } = await api.get(apiPaths.me());
  return {
    ...data,
    userId: data.user_id,
  };
};
