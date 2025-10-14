import { Profile } from "../entities/user-role.entity";

export interface IProfileRepository {
  findById(id: string): Promise<Profile | null>;
  updateRole(id: string, role: string): Promise<Profile | null>;
  create(profileData: Partial<Profile>): Promise<Profile>;
}
