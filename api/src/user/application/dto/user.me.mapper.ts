import { User } from 'src/user/core/entities/user-role.entity';
import { UserMeDto } from './user-me.dto';

export const UserMeMapper = (userData: User): UserMeDto => {
  return {
    user_id: userData.authId,
    email: userData.email,
    role: userData.role,
    permissions: userData.permissions as string[],
    // Only mark blocked if user is an owner and has blockedAt
    isBlocked: userData.role === 'admin' ? undefined : !!userData.blockedAt,
  };
};
