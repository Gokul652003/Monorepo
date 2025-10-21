import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import type { UserDetails } from '../type/user-details';
import { blockUserApi, getUsersList, unblockUserApi } from '../api/users';

type UseUsersListOptions = Omit<UseQueryOptions<UserDetails[], Error>, 'queryKey' | 'queryFn'>;

export const useUsersList = (options?: UseUsersListOptions) => {
  return useQuery<UserDetails[]>({
    queryKey: ['usersList'],
    queryFn: getUsersList,
    ...options,
  });
};

export const useBlockUser = () => {
const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: blockUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['usersList']});
    },
  });
};

export const useUnblockUser = () => {
const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: unblockUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['usersList']});
    },
  });
};
