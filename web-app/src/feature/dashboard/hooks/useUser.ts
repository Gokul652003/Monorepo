import { useQuery } from '@tanstack/react-query';
import { getUserDetails, type DashboardUser } from '../api/get-me';

export const useUser = () => {
  return useQuery<DashboardUser>({
    queryKey: ['currentUser'],
    queryFn: getUserDetails,
  });
};
