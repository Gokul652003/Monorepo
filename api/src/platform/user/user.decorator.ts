import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SupabaseUser } from 'src/platform/gaurd/supabase-auth.guard';

export const User = createParamDecorator(
  (data: keyof SupabaseUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: SupabaseUser }>();
    const user = request.user;

    if (!user) return null; // Or throw UnauthorizedException if you want

    // Optional: return a specific property
    return data ? user[data] : user;
  },
);
