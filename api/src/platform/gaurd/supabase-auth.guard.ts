// src/auth/supabase-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { supabaseAdmin } from 'config';
import { Request } from 'express';

export interface SupabaseUser {
  id: string;
  // email?: string;
  role?: string;
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: SupabaseUser }>();
    let authHeader: string | undefined;
    const rawAuthHeader = request.headers['authorization'];

    // Handle array or string
    if (Array.isArray(rawAuthHeader)) {
      authHeader = rawAuthHeader[0] as string;
    } else if (typeof rawAuthHeader === 'string') {
      authHeader = rawAuthHeader;
    }

    const token = authHeader?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data?.user) throw new UnauthorizedException('Invalid token');

    request.user = {
      id: data.user.id,
      // email: data.user.email || undefined,
      role: data.user.user_metadata?.role as string,
    };

    return true;
  }
}
