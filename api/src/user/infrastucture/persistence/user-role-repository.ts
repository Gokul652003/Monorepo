import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/core/entities/user-role.entity';
import { IUserRepository } from 'src/user/core/repository/user-role-repository';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  async updateRole(id: string, role: string): Promise<User | null> {
    await this.repo.update({ id }, { role });
    return this.repo.findOne({ where: { id } });
  }

  async create(profileData: User): Promise<User> {
    const profile = this.repo.create(profileData);
    return this.repo.save(profile);
  }
}
