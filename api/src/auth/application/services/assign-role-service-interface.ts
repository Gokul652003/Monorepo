// src/core/services/auth.service.interface.ts

import { Profile } from "src/auth/core/entities/user-role.entity";

export interface IAuthService {
    assignRole(userId: string, email:string,role: string): Promise<Profile | null>;
}
