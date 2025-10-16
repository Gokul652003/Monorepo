import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({ description: 'Role to assign', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}
