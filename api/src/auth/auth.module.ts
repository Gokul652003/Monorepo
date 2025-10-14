// src/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './infrastucture/controller/assign-role.controller';
import { AuthService } from './application/services/assign-role.service';
import { ProfileRepository } from './infrastucture/persistence/user-role-repository';
import { Profile } from './core/entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [AuthController],
  providers: [
    { provide: 'IAuthService', useClass: AuthService },
    { provide: 'IProfileRepository', useClass: ProfileRepository },
  ],
})
export class AuthModule {}
 