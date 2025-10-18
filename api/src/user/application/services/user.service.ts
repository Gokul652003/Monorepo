import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IUserService } from './user-service-interface';
import { IUserRepository } from 'src/user/core/repository/user-role-repository';
import { User } from 'src/user/core/entities/user-role.entity';
import { UserMeDto } from '../dto/user-me.dto';
import { UserMeMapper } from '../dto/user.me.mapper';
import { Not } from 'typeorm';
import { UserRole } from 'src/types/common';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly profileRepo: IUserRepository,
  ) {}

  async me(userId: string): Promise<UserMeDto> {
    const user = await this.profileRepo.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const serviceData: UserMeDto = UserMeMapper(user);

    return serviceData;
  }

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

  async blockUser(userId: string, blockUserId: string): Promise<void> {
    const admin = await this.profileRepo.findById(userId);
    const blockUser = await this.profileRepo.findById(blockUserId);

    if (!blockUser) {
      throw new NotFoundException('User to be blocked not found');
    }

    if (admin?.role !== 'admin') {
      throw new NotFoundException('Only admin users can block users');
    }

    if (blockUser.role === 'admin') {
      throw new NotFoundException('Admin users cannot be blocked');
    }

    blockUser.blockedAt = new Date();
    await this.profileRepo.update(userId, admin);
  }

  async unblockUser(userId: string, unblockUserId: string): Promise<void> {
    const admin = await this.profileRepo.findById(userId);
    const unblockUser = await this.profileRepo.findById(unblockUserId);

    if (!unblockUser) {
      throw new NotFoundException('User to be unblocked not found');
    }

    if (admin?.role !== 'admin') {
      throw new NotFoundException('Only admin users can unblock users');
    }

    unblockUser.blockedAt = null;
    await this.profileRepo.update(userId, admin);
  }

  async listUsers(): Promise<UserMeDto[]> {
    const users = await this.profileRepo.findAll({
      role: Not(UserRole.Admin),
    });

    return users.map((user) => UserMeMapper(user));
  }
}
