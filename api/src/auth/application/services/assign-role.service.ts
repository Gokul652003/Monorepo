// src/application/services/auth.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IAuthService } from './assign-role-service-interface';
import { type IProfileRepository } from 'src/auth/core/repository/user-role-repository';
import { Profile } from 'src/auth/core/entities/user-role.entity';


@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject('IProfileRepository')
        private readonly profileRepo: IProfileRepository,
    ) { }

    async assignRole(userId: string, role: string): Promise<Profile | null> {
        const user = await this.profileRepo.findById(userId);
        if (!user) throw new NotFoundException('User not found');
        return this.profileRepo.updateRole(userId, role);
    }
}
