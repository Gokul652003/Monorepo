import {
  Controller,
  Post,
  Body,
  Headers,
  Inject,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IUserService } from 'src/user/application/services/assign-role-service-interface';
import { supabaseAdmin } from 'supabase/config';

@Controller('user')
export class UserController {
  constructor(
    @Inject(IUserService)
    private readonly authService: IUserService,
  ) {}

  @Post('assign-role')
  @HttpCode(HttpStatus.OK) 
  async assignRole(
    @Body() body: { role: string; email: string },
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader?.split(' ')[1];
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid token');
    }

    const userId = data.user.id;
    await this.authService.assignRole(userId, body.email, body.role);
  }
}
