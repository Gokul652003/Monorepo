import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '../api/get-me';
import type { UserDetails } from '../type/user-details';
import { QUERY_KEYS } from '@/constants/query-key';

export const useProfile = () => {
  return useQuery<UserDetails>({
    queryKey: [QUERY_KEYS.currentUser],
    queryFn: getUserDetails,
  });
};
