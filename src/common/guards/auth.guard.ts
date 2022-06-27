import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { verify } from "jsonwebtoken";

import { UsersService } from "../../users/users.service";

import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UsersService) {
    }
    
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    
    private async validateRequest(request: any): Promise<boolean> {
        let token = request.headers.authorization;
        if (!token) return false;
        token = token.split(" ")[1];
        try {
            const data: any = verify(
                token,
                process.env.JWT_SECRET
            );
            const test = await this.userService.findOne(data.email);
            request.body.user = test.toJSON();
            return true;
        } catch {
            return false;
        }
    }
}
