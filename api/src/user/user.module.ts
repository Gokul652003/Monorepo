// src/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './infrastucture/controller/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infrastucture/persistence/user-role-repository';
import { User } from './core/entities/user-role.entity';
import { IUserService } from './application/services/user-service-interface';
import { IUserRepository } from './core/repository/user-role-repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    { provide: IUserService, useClass: UserService },
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
 