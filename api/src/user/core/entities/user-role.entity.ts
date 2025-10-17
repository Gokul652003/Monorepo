import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_role', schema: 'user' })
export class User {
  @PrimaryColumn({ type: 'uuid', name: 'auth_id' })
  authId: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'timestamp', name: 'blocked_at', nullable: true })
  blockedAt: Date | null;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  permissions: any;
}
