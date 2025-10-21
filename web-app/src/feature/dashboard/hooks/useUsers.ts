import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { UserDetails } from '../type/user-details';
import { blockUserApi, getUsersList, unblockUserApi } from '../api/users';
import { QUERY_KEYS } from '@/constants/query-key';

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
