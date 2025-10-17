import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserService } from './assign-role-service-interface';
import { IUserRepository } from 'src/user/core/repository/user-role-repository';
import { User } from 'src/user/core/entities/user-role.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly profileRepo: IUserRepository,
  ) {}

  async assignRole(
    userId: string,
    email: string,
    role: string,
  ): Promise<User | null> {
    const user = await this.profileRepo.findById(userId);
    if (user) throw new NotFoundException('User already exists');
    // You need a create method in your repository
    return this.profileRepo.create({ authId: userId, email, role });
  }
}
