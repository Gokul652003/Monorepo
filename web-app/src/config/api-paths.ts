export const apiPaths = {
  me: () => 'users/me',
  usersList: () => 'users',
  blockUser: (userId: string) => `users/block-user/${userId}`,
  unBlockUser: (userId: string) => `users/unblock-user/${userId}`,
};
