import { User } from '../entities/user-role.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  updateRole(id: string, role: string): Promise<User | null>;
  create(profileData: Partial<User>): Promise<User>;
}

export const IUserRepository = Symbol('IUserRepository');
