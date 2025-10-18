export interface UserMeDto {
  user_id: string;
  email: string;
  role: string;
  permissions: string[];
  isBlocked?: boolean;
}
