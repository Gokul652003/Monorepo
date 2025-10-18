import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { IUserService } from 'src/user/application/services/user-service-interface';
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
import { Roles } from 'src/user/role-decorator';
import { UserRole } from 'src/types/common';
import { RolesGuard } from 'src/platform/gaurd/user-role.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'Returns a simple message' })
  async getMe(@User() user: SupabaseUser) {
    return this.userService.me(user.id);
  }

  @Post('assign-role')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiBody({ type: AssignRoleDto })
  async assignRole(@User() user: SupabaseUser, @Body() body: AssignRoleDto) {
    const userId = user.id;
    await this.userService.assignRole(userId, body.email, body.role);
  }

  @Post('block-user/:userId')
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Block a user' })
  async blockUser(
    @Param('userId') blockUserId: string,
    @User() user: SupabaseUser,
  ) {
    await this.userService.blockUser(user.id, blockUserId);
  }

  @Post('unblock-user/:userId')
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unblock a user' })
  async unblockUser(
    @Param('userId') unblockUserId: string,
    @User() user: SupabaseUser,
  ) {
    await this.userService.unblockUser(user.id, unblockUserId);
  }

  @Post()
  @Roles(UserRole.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listing user' })
  async listUsers() {
    return await this.userService.listUsers();
  }
}
