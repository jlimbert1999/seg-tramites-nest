import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { META_RESOURCES } from '../decorators/role-protected.decorator';
import { userRequest } from '../interfaces/payload.interface';

@Injectable()
export class UserRoleGuard implements CanActivate {
  // acces metadata with reflector
  constructor(
    private readonly reflector: Reflector) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const validResource = this.reflector.get(META_RESOURCES, context.getClass())
    if (!validResource) return true
    const req = context.switchToHttp().getRequest()
    const user = req.user as userRequest
    if (!user) throw new InternalServerErrorException('Guard Auth problems or not call, no user in requets')
    const privilege = user.rol.privileges.find(element => element.resource === validResource)
    if (!privilege) throw new ForbiddenException(`Esta cuenta no tiene permisos para el recurso ${validResource}`)
    let allow = false;
    if (req.method == "POST" && privilege.create) allow = true;
    else if (req.method == "GET" && privilege.read) allow = true;
    else if (req.method == "PUT" && privilege.update) allow = true;
    else if (req.method == "DELETE" && privilege.delete) allow = true;
    return allow
  }
}
