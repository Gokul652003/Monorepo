import api from '@/lib/api-client';
import type { UserDetails } from '../type/user-details';

export const getUserDetails = async (): Promise<UserDetails> => {
  const { data } = await api.get('users/me'); 
  return {
    ...data,
    userId: data.user_id,
  };
};
