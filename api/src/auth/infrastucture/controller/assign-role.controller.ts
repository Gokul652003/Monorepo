// src/presentation/controllers/auth.controller.ts
import { Controller, Post, Body, Headers, Inject, UnauthorizedException,Get } from '@nestjs/common';
import { type IAuthService } from 'src/auth/application/services/assign-role-service-interface';
import { supabaseAdmin } from 'supabase/config';



@Controller('auth')
export class AuthController {
    constructor(
        @Inject('IAuthService')
        private readonly authService: IAuthService
    ) { }

    @Post('assign-role')
    async assignRole(@Body() body: { role: string,email:string }, @Headers('authorization') authHeader: string) {
        const token = authHeader?.split(' ')[1];
        const { data, error } = await supabaseAdmin.auth.getUser(token);

        if (error || !data?.user) throw new UnauthorizedException('Invalid token');

        const userId = data.user.id;
        const updated = await this.authService.assignRole(userId, body.email,body.role);

        return { success: true, user: updated };
    }
}
