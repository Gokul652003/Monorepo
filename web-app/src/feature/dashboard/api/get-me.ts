import api from '@/lib/api-client';
import type { UserDetails } from '../type/user-details';
import { apiPaths } from '@/config/api-paths';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-key';

export const getUserDetails = async (): Promise<UserDetails> => {
  const { data } = await api.get(apiPaths.me());
  return {
    ...data,
    userId: data.user_id,
  };
};


export const useProfile = () => {
  return useQuery<UserDetails>({
    queryKey: [QUERY_KEYS.currentUser],
    queryFn: getUserDetails,
  });
};