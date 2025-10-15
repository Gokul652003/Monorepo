import { User } from "src/user/core/entities/user-role.entity";

export interface IUserService {
    assignRole(userId: string, email: string, role: string): Promise<User | null>;
}

export const IUserService = Symbol("IUserService")