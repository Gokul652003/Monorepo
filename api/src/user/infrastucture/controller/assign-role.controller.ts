import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { IUserService } from 'src/user/application/services/assign-role-service-interface';
import { type SupabaseUser } from 'src/platform/gaurd/supabase-auth.guard';
import { User } from 'src/platform/user/user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AssignRoleDto } from './dto/assign-role.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserService)
    private readonly authService: IUserService,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'Returns a simple message' })
  getMe() {
    return { message: 'User service is up and running' };
  }

  @Post('assign-role')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiBody({ type: AssignRoleDto })
  async assignRole(@User() user: SupabaseUser, @Body() body: AssignRoleDto) {
    console.log(user);
    const userId = user.id;
    await this.authService.assignRole(userId, body.email, body.role);
  }
}
