import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES} from "../constants";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }
    canActivate(context: ExecutionContext): boolean {
        const role = this.reflector.get<string[]>(
            ROLES,
            context.getHandler(),
        );
        if (!role) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return user && role.includes(user.dataValues.role);
    }
}