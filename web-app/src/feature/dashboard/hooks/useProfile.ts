import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '../api/get-me';
import type { UserDetails } from '../type/user-details';

export const useProfile = () => {
  return useQuery<UserDetails>({
    queryKey: ['currentUser'],
    queryFn: getUserDetails,
  });
};
