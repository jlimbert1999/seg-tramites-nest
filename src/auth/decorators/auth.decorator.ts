import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtected } from './role-protected.decorator';
import { ValidResources } from '../interfaces/valid-roles';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guard/user-role.guard';

export function Auth(resource?: ValidResources) {
    return applyDecorators(
        RoleProtected(resource),
        UseGuards(AuthGuard(), UserRoleGuard)
    );
}