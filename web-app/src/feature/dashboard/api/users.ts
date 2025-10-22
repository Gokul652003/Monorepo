import api from '@/lib/api-client';
import type { UserDetails } from '../type/user-details';
import { apiPaths } from '@/config/api-paths';
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-key';

export const getUsersList = async (): Promise<UserDetails[]> => {
  const response = await api.post<(Omit<UserDetails, "userId"> & { user_id: string })[]>(apiPaths.usersList());

  return response.data.map((user) => ({
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


type UseUsersListOptions = Omit<UseQueryOptions<UserDetails[], Error>, 'queryKey' | 'queryFn'>;

export const useUsersList = (options?: UseUsersListOptions) => {
  return useQuery<UserDetails[]>({
    queryKey: [QUERY_KEYS.usersList],
    queryFn: getUsersList,
    ...options,
  });
};

export const useBlockUser = (options:UseMutationOptions<void, Error, string>) => {
  return useMutation<void, Error, string>({
    mutationFn: blockUserApi,
    ...options
  });
};

export const useUnblockUser = (options:UseMutationOptions<void, Error, string>) => {
  return useMutation<void, Error, string>({
    mutationFn: unblockUserApi,
    ...options
  });
};
