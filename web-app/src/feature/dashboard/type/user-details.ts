export type UserDetails = {
  userId: string;
  email: string;
  role: string;
  permissions: {};
  isBlocked: boolean|undefined;
}