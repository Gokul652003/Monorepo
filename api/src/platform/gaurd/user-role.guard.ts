import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/types/common';
import { User } from 'src/user/core/entities/user-role.entity';
import { ROLES_KEY } from '../decorator/user-role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required roles from the @Roles() decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If a route has no @Roles decorator, grant access
    if (!requiredRoles) {
      return true;
    }

    // Get the user object from the request
    // This is attached by a preceding authentication guard (e.g., JwtAuthGuard)
    const { user }: { user: User } = context.switchToHttp().getRequest();
    // If there is no user object, deny access (should not happen if auth guard is in place)
    if (!user) {
      return false;
    }

    // Check if the user's role is included in the list of required roles
    return requiredRoles.some((role) => user.role === role.toString());
  }
}
