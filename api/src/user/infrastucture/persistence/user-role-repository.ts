import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/core/entities/user-role.entity';
import { IUserRepository } from 'src/user/core/repository/user-role-repository';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findAll(filter?: FindOptionsWhere<User>): Promise<User[]> {
    return this.repo.find({ where: filter });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { authId: id } });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: string, User: User): Promise<void | null> {
    await this.repo.update({ authId: id }, User);

    await this.repo.save(User);
  }

  async create(profileData: User): Promise<User> {
    const profile = this.repo.create(profileData);
    return this.repo.save(profile);
  }
}
