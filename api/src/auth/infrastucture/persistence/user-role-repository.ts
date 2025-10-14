import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/auth/core/entities/user-role.entity';
import { IProfileRepository } from 'src/auth/core/repository/user-role-repository';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileRepository implements IProfileRepository {
    constructor(
        @InjectRepository(Profile)
        private readonly repo: Repository<Profile>,
    ) { }

    async findById(id: string): Promise<Profile | null> {
        return this.repo.findOne({ where: { id } });
    }

    async updateRole(id: string, role: string): Promise<Profile | null> {
        await this.repo.update({ id }, { role });
        const a = this.repo.findOne({ where: { id } });
        return this.repo.findOne({ where: { id } });
    }

    async create(profileData: Profile): Promise<Profile> {
        const profile = this.repo.create(profileData);
        return this.repo.save(profile);
    }
}
