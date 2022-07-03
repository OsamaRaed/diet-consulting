import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { verify } from "jsonwebtoken";
import {UserService} from "../../modules/user/user.service";
import {ConfigService} from "@nestjs/config";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly reflector: Reflector,
        private readonly configService: ConfigService
    ) {
    }
    
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('AuthGuard');
        const PublicRoute = this.reflector.get<string[]>(
            'PublicRoute',
            context.getHandler(),
        );

        if (PublicRoute) {
            console.log('public route: ' + PublicRoute);
            return true;
        }
        console.log('public route: ' + PublicRoute);
        return this.validateRequest(request);
    }
    
    private async validateRequest(request: any): Promise<boolean> {


        let token = request.headers.authorization;
        if (!token) return false;

        token = token.split(" ")[1];

        try {
            const data: any = verify(
                token,
                this.configService.get('jwt').secret
            );
            const test = await this.userService.findById(data);
            request.user = test.toJSON();
            return true;
        } catch {
            return false;
        }
    }
}
