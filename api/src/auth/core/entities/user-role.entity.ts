import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user-role')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  role: string;
}
