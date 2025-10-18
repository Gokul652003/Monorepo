import { FindOptionsWhere } from 'typeorm';
import { User } from '../entities/user-role.entity';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  update(id: string, user: User): Promise<void | null>;
  create(profileData: Partial<User>): Promise<User>;
  findAll(filter?: FindOptionsWhere<User>): Promise<User[]>;
}

export const IUserRepository = Symbol('IUserRepository');
