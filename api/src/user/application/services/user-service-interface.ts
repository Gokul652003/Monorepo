import { User } from 'src/user/core/entities/user-role.entity';
import { UserMeDto } from '../dto/user-me.dto';

export interface IUserService {
  me(userId: string): Promise<UserMeDto>;
  assignRole(userId: string, email: string, role: string): Promise<User | null>;
  blockUser(userId: string, blockUserId: string): Promise<void>;
  unblockUser(userId: string, unblockUserId: string): Promise<void>;
  listUsers(): Promise<UserMeDto[]>;
}

export const IUserService = Symbol('IUserService');
