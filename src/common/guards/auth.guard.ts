import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {UserService} from "../../modules/user/user.service";
import {ConfigService} from "@nestjs/config";
import {Reflector} from "@nestjs/core";
import {PUBLIC} from "../constants";
import {verifyToken} from "../utils";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly reflector: Reflector,
        private readonly configService: ConfigService
    ) {
    }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const PublicRoute = this.reflector.get<string[]>(
            PUBLIC,
            context.getHandler(),
        );

        if (PublicRoute) {
            return true;
        }

        let token = request.headers.authorization;
        if (!token) return false;
        token = token.split(" ")[1];
        try {
            const decoded = verifyToken(token, this.configService.get("jwt").secret);
            const user = await this.userService.findById(decoded);
            if (!user) return false;
            request.user = user.toJSON();
            return true;
        } catch {
            return false;
        }
    }
}
